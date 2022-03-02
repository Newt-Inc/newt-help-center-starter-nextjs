import { Content } from "newt-client-js";
import { Author } from "./author";
import { Category } from "./category";

export interface Article {
  title: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    ogImage: { src: string } | null;
  };
  body: string;
  coverImage: { src: string } | null;
  author: (Content & Author) | null;
  categories: (Content & Category)[];
}
