import { Content } from "newt-client-js";
import Link from "next/link";
import styles from "../styles/Dropdown.module.css";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Category } from "../types/category";

export function Dropdown({
  categories,
  selected = "",
}: {
  categories: (Content & Category)[];
  selected?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(
    (e: MouseEvent<HTMLButtonElement>, bool: boolean) => {
      e.stopPropagation();
      setIsOpen(bool);
    },
    []
  );

  const categoriesWithAll = useMemo(() => {
    return [
      {
        _id: "all",
        name: "All articles",
        slug: "",
      },
      ...categories,
    ];
  }, [categories]);

  const selectedCategory = useMemo(() => {
    return categoriesWithAll.find((category) => category.slug === selected);
  }, [categoriesWithAll, selected]);

  useEffect(() => {
    const closeDropdown = () => {
      setIsOpen(false);
    };

    window.addEventListener("touchstart", closeDropdown);
    window.addEventListener("click", closeDropdown);

    return () => {
      window.removeEventListener("touchstart", closeDropdown);
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className={styles.Dropdown}>
      <button
        type="button"
        className={styles.Dropdown_Button}
        onClick={(e) => toggle(e, !isOpen)}
      >
        <span>{selectedCategory?.name || ""}</span>
        <svg width="12" height="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.95477076 6.81206945c-.23590466-.01386477-.46783341-.11091814-.6480754-.29116012L.69289267 1.90710664l-.07770636-.08722082C.30436085 1.42736817.33026297.85552277.69289267.49289307c.39052429-.39052429 1.02368927-.39052429 1.41421356 0l3.90889322 3.91017638L9.92669536.49289307c.3905243-.39052429 1.02368928-.39052429 1.41421357 0 .3626297.3626297.38853182.9344751.07770636 1.32699275l-.07770636.08722082-4.6138027 4.61380269c-.18024198.18024198-.41217073.27729535-.64807539.29116012z"
            fill="#333"
            fillRule="nonzero"
          />
        </svg>
      </button>
      {isOpen && (
        <div className={styles.Dropdown_List}>
          {categoriesWithAll.map((category) => (
            <Link
              href={category.slug ? `/category/${category.slug}` : "/"}
              key={category._id}
            >
              <a href="#" className={styles.Dropdown_Item}>
                {category.name}
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
