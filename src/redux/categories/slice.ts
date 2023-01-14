import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState, Category, CategoryField } from "./types";

const initialState: CategoriesState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addEmptyCategory(
      state: CategoriesState,
      { payload }: PayloadAction<Category>,
    ) {
      state.categories.push(payload);
    },
    updateCategoryName(
      state: CategoriesState,
      { payload }: PayloadAction<{ index: number; newName: string }>,
    ) {
      state.categories[payload.index].name = payload.newName;
    },
    updateFieldName(
      state: CategoriesState,
      {
        payload,
      }: PayloadAction<{
        categoryIndex: number;
        fieldIndex: number;
        newName: string;
      }>,
    ) {
      state.categories[payload.categoryIndex].fields[payload.fieldIndex].name =
        payload.newName;
      if (state.categories[payload.categoryIndex].fields.length === 1) {
        state.categories[payload.categoryIndex].fields[
          payload.fieldIndex
        ].isTitle = true;
      }
    },
    updateFields(
      state: CategoriesState,
      {
        payload,
      }: PayloadAction<{ categoryIndex: number; fields: CategoryField[] }>,
    ) {
      state.categories[payload.categoryIndex].fields = payload.fields;
    },
    updateCategories(
      state: CategoriesState,
      { payload }: PayloadAction<{ categoryIndex: number }>,
    ) {
      state.categories.splice(payload.categoryIndex, 1);
    },
    addCategory(state: CategoriesState, { payload }: PayloadAction<Category>) {
      state.categories.push(payload);
    },
  },
});

export const {
  addEmptyCategory,
  updateCategoryName,
  updateFieldName,
  updateFields,
  updateCategories,
  addCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
