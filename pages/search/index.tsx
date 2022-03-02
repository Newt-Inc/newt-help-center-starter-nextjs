import styles from "../../styles/Search.module.css";
import { AppMeta, Content } from "newt-client-js";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "../../components/Layout";
import { fetchApp, fetchArticles } from "../../lib/api";
import { Article } from "../../types/article";
import { htmlToText } from "html-to-text";

export default function Search({ app }: { app: AppMeta }) {
  const router = useRouter();
  const { q, page } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<(Content & Article)[]>([]);
  const [total, setTotal] = useState<number>(0);

  const _page = useMemo(() => {
    return Number(page) || 1;
  }, [page]);

  useEffect(() => {
    (async () => {
      if (typeof q !== "string" || q === "") {
        return;
      }
      const { articles, total } = await fetchArticles({
        search: q,
        page: _page,
        limit: 100,
        format: "text",
      });
      setArticles(articles);
      setTotal(total);
      setIsLoading(true);
    })();
  }, [q, _page, router]);

  return (
    <Layout app={app} containerStyle={{ flex: 1, display: "flex" }}>
      <Head>
        <title>{app?.name || app?.uid || ""}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {articles.length > 0 ? (
        <div className={styles.Search}>
          <p className={styles.Search_Text}>
            Found {total} results for your search
          </p>
          <div className={styles.Search_Results}>
            {articles.map((article) => (
              <article key={article._id} className={styles.Article}>
                <Link href={`/article/${article.slug}`}>
                  <a href="#" className={styles.Article_Link}>
                    <h1 className={styles.Article_Title}>{article.title}</h1>
                    <p className={styles.Article_Description}>
                      {htmlToText(article.body, {
                        selectors: [{ selector: "img", format: "skip" }],
                      })}
                    </p>
                  </a>
                </Link>
              </article>
            ))}
          </div>
        </div>
      ) : (
        isLoading && (
          <div className={styles.Empty}>
            <div className={styles.Empty_Emoji}>😵</div>
            <h1 className={styles.Empty_Title}>Nothing found</h1>
            <p className={styles.Empty_Description}>
              Sorry, but nothing matched search terms…
              <br />
              Please try again with different keywords!
            </p>
          </div>
        )
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const app = await fetchApp();
  return {
    props: {
      app,
    },
  };
}
