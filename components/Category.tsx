import { htmlToText } from "html-to-text";
import { AppMeta, Content } from "newt-client-js";
import Head from "next/head";
import Link from "next/link";
import { useCallback } from "react";
import styles from "../styles/Category.module.css";
import { Article } from "../types/article";
import { Category } from "../types/category";
import { Layout } from "./Layout";
import { Pagination } from "./Pagination";

export interface CategoryProps {
  app: AppMeta;
  category: Category;
  articles: (Content & Article)[];
  total: number;
  page?: number;
}

export function Category({
  app,
  category,
  articles,
  total,
  page = 1,
}: CategoryProps) {
  const _htmlToText = useCallback((html) => {
    return htmlToText(html, {
      selectors: [
        {
          selector: "img",
          format: "skip",
        },
      ],
    });
  }, []);

  return (
    <Layout app={app}>
      <Head>
        <title>{app?.name || app?.uid || ""}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.Inner}>
        <div className={styles.Category_Header}>
          <em>{category.emoji.value}</em>
          <div className={styles.Category_Text}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </div>
        </div>
        <div className={styles.Articles}>
          {articles.map((article) => (
            <article className={styles.Article} key={article._id}>
              <Link href={`/article/${article.slug}`}>
                <a className={styles.Article_Link}>
                  <h3 className={styles.Article_Title}>{article.title}</h3>
                  <p className={styles.Article_Description}>
                    {_htmlToText(article.body)}
                  </p>
                </a>
              </Link>
            </article>
          ))}
          <Pagination
            total={total}
            current={page}
            basePath={`/category/${category.slug}`}
          />
        </div>
      </div>
    </Layout>
  );
}
