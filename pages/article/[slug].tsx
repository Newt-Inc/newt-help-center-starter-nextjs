import { AppMeta, Content } from "newt-client-js";
import styles from "../../styles/Article.module.css";
import Head from "next/head";
import { useMemo } from "react";
import { Layout } from "../../components/Layout";
import { fetchApp, fetchArticles, fetchCurrentArticle } from "../../lib/api";
import { formatDate } from "../../lib/date";
import { Article } from "../../types/article";
import { htmlToText } from "html-to-text";

export default function ArticlePage({
  app,
  currentArticle,
}: {
  app: AppMeta;
  currentArticle: (Content & Article) | null;
}) {
  const meta = useMemo(() => {
    if (currentArticle?.meta) {
      return currentArticle.meta;
    }
    return null;
  }, [currentArticle]);

  const title = useMemo(() => {
    if (meta?.title) {
      return meta.title;
    }
    if (currentArticle?.title) {
      return currentArticle.title;
    }
    return app.name || app.uid || "";
  }, [app, meta, currentArticle?.title]);

  const description = useMemo(() => {
    if (meta?.description) {
      return meta.description;
    }
    if (currentArticle?.body) {
      return htmlToText(currentArticle.body, {
        selectors: [{ selector: "img", format: "skip" }],
      }).slice(0, 200);
    }
    return "";
  }, [app, meta, currentArticle?.body]);

  const authorName = useMemo(() => {
    return currentArticle?.author?.fullName || "NO NAME";
  }, [currentArticle?.author?.fullName]);

  const publishDate = useMemo(() => {
    return currentArticle?._sys?.createdAt
      ? formatDate(currentArticle._sys.createdAt)
      : "";
  }, [currentArticle?._sys?.createdAt]);

  const body = useMemo(() => {
    if (currentArticle?.body) {
      return {
        __html: currentArticle.body,
      };
    }
    return {
      __html: "",
    };
  }, [currentArticle?.body]);

  const authorIntroduction = useMemo(() => {
    if (currentArticle?.author?.introduction) {
      return {
        __html: currentArticle.author.introduction,
      };
    }
    return {
      __html: "",
    };
  }, [currentArticle?.author?.introduction]);

  return (
    <Layout app={app}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className={styles.Article}>
        <div className={styles.Article_Header}>
          <h1 className={styles.Article_Title}>
            {currentArticle?.title || ""}
          </h1>
          <div className={styles.Article_Data}>
            <div className={styles.Article_Avatar}>
              {currentArticle?.author?.profileImage ? (
                <img
                  src={currentArticle.author.profileImage.src}
                  alt=""
                  width="32"
                  height="32"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="#CCCCCC"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
            <div className={styles.Article_AuthorName}>{authorName}</div>
            <time
              dateTime={currentArticle?._sys?.createdAt}
              className={styles.Article_Date}
            >
              {publishDate}
            </time>
          </div>
        </div>
        <div
          className={styles.Article_Body}
          dangerouslySetInnerHTML={body}
        ></div>
        <aside className={styles.Author}>
          <div className={styles.Author_Avatar}>
            {currentArticle?.author?.profileImage ? (
              <img
                src={currentArticle.author.profileImage.src}
                alt=""
                width="48"
                height="48"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                fill="#CCCCCC"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
          <div className={styles.Author_Text}>
            <div className={styles.Author_Name}>{authorName}</div>
            <div
              className={styles.Author_Description}
              dangerouslySetInnerHTML={authorIntroduction}
            ></div>
          </div>
        </aside>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const app = await fetchApp();
  const currentArticle = await fetchCurrentArticle({ slug });
  return {
    props: {
      app,
      currentArticle,
    },
  };
}

export async function getStaticPaths() {
  const { articles } = await fetchArticles({
    limit: 1000,
  });
  return {
    paths: articles.map((article) => ({
      params: {
        slug: article.slug,
      },
    })),
    fallback: "blocking",
  };
}
