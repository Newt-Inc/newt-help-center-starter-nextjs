import { fetchApp, fetchArticles, fetchCategories } from "../lib/api";
import { Home, HomeProps } from "../components/Home";

export default function TopPage(props: HomeProps) {
  return <Home {...props} />;
}

export async function getStaticProps(): Promise<{ props: HomeProps }> {
  const app = await fetchApp();
  const categories = await fetchCategories();
  const { articles, total } = await fetchArticles();
  return {
    props: {
      app,
      categories,
      articles,
      total,
    },
  };
}
