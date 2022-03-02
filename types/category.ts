export interface Category {
  name: string;
  slug: string;
  emoji: {
    type: string;
    value: string;
  };
  description: string;
  sortOrder: number;
}
