import { RootState } from "@appstate/store";
import { shallowEqual, useSelector } from "react-redux";

export const useCategories = (): RootState["categories"] =>
  useSelector((state: RootState) => state.categories, shallowEqual);
