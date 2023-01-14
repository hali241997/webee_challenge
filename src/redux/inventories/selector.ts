import { RootState } from "@appstate/store";
import { shallowEqual, useSelector } from "react-redux";

export const useInventories = (): RootState["inventories"] =>
  useSelector((state: RootState) => state.inventories, shallowEqual);
