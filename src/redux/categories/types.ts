import { FieldType } from "@appstate/common/types";

export interface CategoriesState {
  categories: Array<Category>;
}

export interface Category {
  id: string;
  name: string;
  fields: Array<CategoryField>;
}

export interface CategoryField {
  id: string;
  type: FieldType;
  name: string;
  isTitle: boolean;
}
