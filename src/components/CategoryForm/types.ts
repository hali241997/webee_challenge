import { Category } from "@appstate/categories";

export interface CategoryFormProps {
  index: number;
  name: string;
  fields: Category["fields"];
}
