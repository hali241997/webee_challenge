import { updateFields, useCategories } from "@appstate/categories";
import { updateInventoryFields, useInventories } from "@appstate/inventories";
import React, { FC, useCallback, useEffect, useState } from "react";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { Text, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import styles from "./styles";
import { TitleFieldDropdownProps } from "./types";

const TitleFieldDropdown: FC<TitleFieldDropdownProps> = ({ parentIndex }) => {
  const { categories } = useCategories();
  const { inventories } = useInventories();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<Array<{ label: string; value: string }>>(
    [],
  );

  const updateItems = useCallback(() => {
    const fields = categories[parentIndex].fields;
    const options: Array<{ label: string; value: string }> = [];

    fields.forEach(field => {
      if (field.name) {
        options.push({
          label: `Title Field: ${field.name}`,
          value: field.name,
        });
      }
    });

    setItems(options);
  }, [categories, parentIndex]);

  const handleSelectItem = useCallback(
    (item: ItemType<string>) => {
      const fields = categories[parentIndex].fields;
      const inventoryFields = inventories[parentIndex].fields;
      const fieldIndex = fields.findIndex(field => field.name === item.value);
      if (fieldIndex) {
        fields.forEach(field => {
          field.isTitle = false;
        });
        fields[fieldIndex].isTitle = true;
        inventoryFields.forEach(field => {
          field.isTitle = false;
        });
        inventoryFields[fieldIndex].isTitle = false;
        dispatch(updateFields({ categoryIndex: parentIndex, fields }));
        dispatch(
          updateInventoryFields({
            inventoryIndex: parentIndex,
            fields: inventoryFields,
          }),
        );
      }
    },
    [categories, dispatch, inventories, parentIndex],
  );

  useEffect(() => {
    updateItems();
  }, [updateItems]);

  return (
    <DropDownPicker
      placeholder="TITLE FIELD: UNKNOWN"
      placeholderStyle={styles.label}
      ListEmptyComponent={() => {
        return <Text style={styles.listEmptyText}>Add a field</Text>;
      }}
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      onSelectItem={handleSelectItem}
      items={items}
      setItems={setItems}
      listMode="MODAL"
      style={{ ...styles.dropDown, backgroundColor: theme.colors.primary }}
      ArrowUpIconComponent={() => {
        return <></>;
      }}
      ArrowDownIconComponent={() => {
        return <></>;
      }}
      containerStyle={{
        marginTop: 10,
      }}
      labelStyle={styles.label}
    />
  );
};

export default TitleFieldDropdown;
