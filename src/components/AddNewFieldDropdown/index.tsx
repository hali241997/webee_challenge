import { updateFields, useCategories } from "@appstate/categories";
import { FieldType } from "@appstate/common/types";
import React, { FC, useCallback, useMemo, useState } from "react";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { useTheme } from "react-native-paper";
import styles from "./styles";
import { AddNewFieldDropdownProps } from "./types";
import uuid from "react-native-uuid";
import { useDispatch } from "react-redux";
import { InventoryField, updateInventoryFields } from "@appstate/inventories";

const AddNewFieldDropdown: FC<AddNewFieldDropdownProps> = ({ parentIndex }) => {
  const { categories } = useCategories();
  const dispatch = useDispatch();

  const items = useMemo(() => {
    return Object.values(FieldType).map(val => {
      return { label: val, value: val };
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const theme = useTheme();

  const handleItemSelect = useCallback(
    (item: ItemType<FieldType>) => {
      const fields = [...categories[parentIndex].fields];
      fields.push({
        id: uuid.v4().toString(),
        isTitle: false,
        name: "",
        type: item.label as FieldType,
      });
      dispatch(updateFields({ categoryIndex: parentIndex, fields }));
      const inventoryFields: InventoryField[] = fields.map(field => {
        return { ...field, value: "" };
      });
      dispatch(
        updateInventoryFields({
          inventoryIndex: parentIndex,
          fields: inventoryFields,
        }),
      );
    },
    [categories, dispatch, parentIndex],
  );

  const handleChangeValue = useCallback(() => {
    setValue(null);
  }, []);

  return (
    <DropDownPicker
      placeholder="Add New Field"
      placeholderStyle={styles.label}
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      onSelectItem={handleItemSelect}
      onChangeValue={handleChangeValue}
      items={items}
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

// const AddNewFieldDropdown: FC<AddNewFieldDropdownProps> = ({ onAdd }) => {
//   const list = useMemo(() => {
//     return Object.values(FieldType).map(val => {
//       return { label: val, value: val };
//     });
//   }, []);

//   const [value, setValue] = useState<{ label: string; value: string }>();

//   const handleAdd = useCallback(
//     (value: any) => {
//       onAdd(value);
//     },
//     [onAdd],
//   );

//   return (
//     <View style={styles.container}>
//       <DropdownField
//         placeholder="Add New Field"
//         list={list}
//         value={value}
//         setValue={setValue}

//         inputProps={{ style: styles.dropdownField }}
//       />
//       <Button mode="contained" onPress={() => handleAdd(value)}>
//         Add
//       </Button>
//     </View>
//   );
// };

export default AddNewFieldDropdown;
