import { Home, HomeProps } from "../../../../components/Home";
import {
  fetchApp,
  fetchArticles,
  fetchCategories,
  getPages,
} from "../../../../lib/api";

export default function CategoryPage(props: HomeProps) {
  return <Home {...props} />;
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string; page: string };
}): Promise<{ props: HomeProps }> {
  const { slug, page } = params;
  const app = await fetchApp();
  const categories = await fetchCategories();

  const category = categories.find((_category) => _category.slug === slug);
  const { articles, total } = category
    ? await fetchArticles({
        category: category._id,
        page: Number(page) || 1,
      })
    : { articles: [], total: 0 };
  return {
    props: {
      app,
      categories,
      articles,
      total,
      categorySlug: slug,
    },
  };
}

export async function getStaticPaths() {
  const categories = await fetchCategories();
  const paths: { params: { slug: string; page: string } }[] = [];
  await categories.reduce(async (prevPromise, category) => {
    await prevPromise;
    const pages = await getPages({
      category: category._id,
    });
    pages.forEach((page) => {
      paths.push({
        params: {
          slug: category.slug,
          page: page.number.toString(),
        },
      });
    });
  }, Promise.resolve());

  return {
    paths,
    fallback: "blocking",
  };
}
