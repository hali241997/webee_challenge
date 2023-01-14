import { FieldType } from "@appstate/common/types";

export interface InventoriesState {
  inventories: Array<Inventory>;
}

export interface Inventory {
  id: string;
  name: string;
  fields: Array<InventoryField>;
}

export interface InventoryField {
  id: string;
  value: string;
  type: FieldType;
  name: string;
  isTitle: boolean;
}
