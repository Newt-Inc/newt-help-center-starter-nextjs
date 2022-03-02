import { Home, HomeProps } from "../../components/Home";
import {
  fetchApp,
  fetchArticles,
  fetchCategories,
  getPages,
} from "../../lib/api";

export default function TopPage(props: HomeProps) {
  return <Home {...props} />;
}

export async function getStaticProps({
  params,
}: {
  params: { page: string };
}): Promise<{ props: HomeProps }> {
  const page = Number(params.page) || 1;
  const app = await fetchApp();
  const categories = await fetchCategories();
  const { articles, total } = await fetchArticles({
    page,
  });
  return {
    props: {
      app,
      categories,
      articles,
      total,
      page,
    },
  };
}

export async function getStaticPaths() {
  const pages = await getPages();
  return {
    paths: pages.map((page) => ({
      params: {
        page: page.number.toString(),
      },
    })),
    fallback: "blocking",
  };
}
