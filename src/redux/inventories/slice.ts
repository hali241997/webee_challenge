import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InventoriesState, Inventory, InventoryField } from "./types";

const initialState: InventoriesState = {
  inventories: [],
};

export const inventoriesSlice = createSlice({
  name: "inventories",
  initialState,
  reducers: {
    addInventory(
      state: InventoriesState,
      { payload }: PayloadAction<Inventory>,
    ) {
      state.inventories.push(payload);
    },
    updateInventoryName(
      state: InventoriesState,
      { payload }: PayloadAction<{ index: number; newName: string }>,
    ) {
      state.inventories[payload.index].name = payload.newName;
    },
    updateInventoryFieldName(
      state: InventoriesState,
      {
        payload,
      }: PayloadAction<{
        inventoryIndex: number;
        fieldIndex: number;
        newName: string;
      }>,
    ) {
      state.inventories[payload.inventoryIndex].fields[
        payload.fieldIndex
      ].name = payload.newName;
      if (state.inventories[payload.inventoryIndex].fields.length === 1) {
        state.inventories[payload.inventoryIndex].fields[
          payload.fieldIndex
        ].isTitle = true;
      }
    },
    updateInventoryFields(
      state: InventoriesState,
      {
        payload,
      }: PayloadAction<{ inventoryIndex: number; fields: InventoryField[] }>,
    ) {
      state.inventories[payload.inventoryIndex].fields = payload.fields;
    },
    updateInventories(
      state: InventoriesState,
      { payload }: PayloadAction<{ inventoryIndex: number }>,
    ) {
      state.inventories.splice(payload.inventoryIndex, 1);
    },
  },
});

export const {
  addInventory,
  updateInventories,
  updateInventoryFieldName,
  updateInventoryFields,
  updateInventoryName,
} = inventoriesSlice.actions;

export default inventoriesSlice.reducer;
