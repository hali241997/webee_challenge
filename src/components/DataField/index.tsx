import {
  updateFieldName,
  updateFields,
  useCategories,
} from "@appstate/categories";
import {
  updateInventoryFieldName,
  updateInventoryFields,
  useInventories,
} from "@appstate/inventories";
import React, { FC, useCallback } from "react";
import { View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import styles from "./styles";
import { DataFieldProps } from "./types";

const DataField: FC<DataFieldProps> = ({
  parentIndex,
  fieldIndex,
  name,
  type,
}) => {
  const { categories } = useCategories();
  const { inventories } = useInventories();
  const dispatch = useDispatch();

  const handleFieldNameChange = useCallback(
    (txt: string) => {
      dispatch(
        updateFieldName({
          categoryIndex: parentIndex,
          fieldIndex,
          newName: txt,
        }),
      );
      dispatch(
        updateInventoryFieldName({
          inventoryIndex: parentIndex,
          fieldIndex,
          newName: txt,
        }),
      );
    },
    [dispatch, fieldIndex, parentIndex],
  );

  const handleFieldDelete = useCallback(() => {
    const fields = [...categories[parentIndex].fields];
    fields.splice(fieldIndex, 1);
    dispatch(updateFields({ categoryIndex: parentIndex, fields }));

    const inventoryFields = [...inventories[parentIndex].fields];
    inventoryFields.slice(fieldIndex, 1);
    dispatch(
      updateInventoryFields({
        inventoryIndex: parentIndex,
        fields: inventoryFields,
      }),
    );
  }, [categories, dispatch, fieldIndex, inventories, parentIndex]);

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Field Name"
        style={styles.fieldName}
        value={name}
        onChangeText={handleFieldNameChange}
      />
      <View style={styles.typeContainer}>
        <Text>{type}</Text>
      </View>

      <IconButton icon="delete" onPress={handleFieldDelete} />
    </View>
  );
};

export default DataField;
