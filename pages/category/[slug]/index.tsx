import { Category, CategoryProps } from "../../../components/Category";
import { fetchApp, fetchArticles, fetchCategories } from "../../../lib/api";

export default function CategoryPage(props: CategoryProps) {
  return <Category {...props} />;
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string };
}): Promise<{ props: CategoryProps }> {
  const { slug } = params;
  const app = await fetchApp();
  const categories = await fetchCategories();

  const category = categories.find((_category) => _category.slug === slug);
  const { articles, total } = category
    ? await fetchArticles({
        category: category._id,
      })
    : { articles: [], total: 0 };
  return {
    props: {
      app,
      category,
      articles,
      total,
    },
  };
}

export async function getStaticPaths() {
  const categories = await fetchCategories();
  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: "blocking",
  };
}
