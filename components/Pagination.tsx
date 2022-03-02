import Link from "next/link";
import styles from "../styles/Pagination.module.css";
import { useMemo } from "react";

export function Pagination({
  total = 0,
  current = 1,
  basePath = "",
}: {
  total?: number;
  current?: number;
  basePath?: string;
}) {
  const pages = useMemo(() => {
    return Array(
      Math.ceil(total / (Number(process.env.NEXT_PUBLIC_PAGE_LIMIT) || 10))
    )
      .fill({ number: 0, isCurrent: false })
      .map((value, index) => {
        const pageNumber = index + 1;
        return {
          ...value,
          number: pageNumber,
          isCurrent: current === pageNumber,
        };
      });
  }, [total, current]);

  return (
    <nav className={styles.Pagination}>
      <ul className={styles.Pagination_Items}>
        {pages.map((page) => (
          <li key={page.number} className={styles.Pagination_Item}>
            <Link href={`${basePath}/page/${page.number}`}>
              <a
                type="button"
                className={`${styles.Pagination_Button} ${
                  page.isCurrent ? styles._current : ""
                }`}
              >
                {page.number}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
