import { AppMeta, Content } from "newt-client-js";
import styles from "../../styles/Article.module.css";
import Head from "next/head";
import { useMemo } from "react";
import { Layout } from "../../components/Layout";
import { fetchApp, fetchArticles, fetchCurrentArticle } from "../../lib/api";
import { Article } from "../../types/article";
import { htmlToText } from "html-to-text";
import Link from "next/link";

export default function ArticlePage({
  app,
  currentArticle,
  relatedArticles,
}: {
  app: AppMeta;
  currentArticle: (Content & Article) | null;
  relatedArticles: (Content & Article)[];
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

  return (
    <Layout app={app}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className={styles.Article}>
        <div className={styles.Article_Header}>
          <ul className={styles.Breadcrumb}>
            <li className={styles.Breadcrumb_Item}>
              <Link href="/">
                <a className={styles.Breadcrumb_Link}>Home</a>
              </Link>
            </li>
            <li
              v-if="currentArticle.category"
              className={styles.Breadcrumb_Item}
            >
              <Link href={`/category/${currentArticle.category.slug}`}>
                <a className={styles.Breadcrumb_Link}>
                  {currentArticle.category.name}
                </a>
              </Link>
            </li>
          </ul>
          <h1 className={styles.Article_Title}>
            {currentArticle?.title || ""}
          </h1>
        </div>
        <div
          className={styles.Article_Body}
          dangerouslySetInnerHTML={body}
        ></div>
        <section className={styles.Related}>
          <h2 className={styles.Related_Heading}>Related articles</h2>
          <ul className={styles.Related_List}>
            {relatedArticles.map((article) => (
              <li className={styles.Related_Item} key={article._id}>
                <Link href={`/article/${article.slug}`}>{article.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const app = await fetchApp();
  const currentArticle = await fetchCurrentArticle({ slug });
  let relatedArticles: (Content & Article)[] = [];
  if (currentArticle) {
    const { articles } = await fetchArticles({
      query: {
        tags: currentArticle.tags,
        slug: {
          ne: currentArticle.slug,
        },
        select: ["slug", "title"],
      },
    });
    relatedArticles = articles;
  }
  return {
    props: {
      app,
      currentArticle,
      relatedArticles,
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
