import Link from "next/link";
import styles from "../styles/ArticleCard.module.css";
import { Content } from "newt-client-js";
import { Article } from "../types/article";
import { useMemo } from "react";
import { htmlToText } from "html-to-text";

export function ArticleCard({ article }: { article: Content & Article }) {
  const body = useMemo(() => {
    return htmlToText(article.body, {
      selectors: [
        {
          selector: "img",
          format: "skip",
        },
      ],
    });
  }, [article.body]);

  return (
    <article className={styles.Article}>
      <Link href={`/article/${article.slug}`}>
        <a href="#" className={styles.Article_Link}>
          <h3 className={styles.Article_Title}>{article.title}</h3>
          <p className={styles.Article_Description}>{body}</p>
        </a>
      </Link>
    </article>
  );
}
