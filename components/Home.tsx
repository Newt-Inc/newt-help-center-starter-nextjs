import { AppMeta, Content } from "newt-client-js";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Cover } from "../components/Cover";
import { Layout } from "../components/Layout";
import { Category } from "../types/category";
import { ArticleCard } from "../components/ArticleCard";
import { Article } from "../types/article";
import Link from "next/link";

export interface HomeProps {
  app: AppMeta;
  categories: (Content & Category)[];
  articles: (Content & Article)[];
}

export function Home({ app, categories, articles }: HomeProps) {
  return (
    <Layout app={app}>
      <Head>
        <title>{app?.name || app?.uid || ""}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {app.cover?.value && <Cover app={app} />}
      <div className={styles.Inner}>
        <div className={styles.Categories}>
          {categories.map((category) => (
            <div className={styles.Category} key={category._id}>
              <Link href={`/category/${category.slug}`}>
                <a className={styles.Category_Link}>
                  <em>{category.emoji.value}</em>
                  <div className={styles.Category_Text}>
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.Articles}>
          <h2 className={styles.Articles_Heading}>Recent articles</h2>
          <div className={styles.Articles_Inner}>
            {articles.map((article) => (
              <ArticleCard article={article} key={article._id} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
