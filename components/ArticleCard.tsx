import Link from "next/link";
import styles from "../styles/ArticleCard.module.css";
import { Content } from "newt-client-js";
import { Article } from "../types/article";

export function ArticleCard({ article }: { article: Content & Article }) {
  return (
    <article className={styles.Article}>
      <Link href={`/article/${article.slug}`}>
        <a href="#" className={styles.Article_Link}>
          <h3 className={styles.Article_Title}>{article.title}</h3>
          <p className={styles.Article_Description}>{article.description}</p>
        </a>
      </Link>
    </article>
  );
}
