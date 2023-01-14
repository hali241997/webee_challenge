import { updateCategories, updateCategoryName } from "@appstate/categories";
import { updateInventories, updateInventoryName } from "@appstate/inventories";
import AddNewFieldDropdown from "@components/AddNewFieldDropdown";
import DataField from "@components/DataField";
import TitleFieldDropdown from "@components/TitleFieldDropdown";
import React, { FC, useCallback } from "react";
import { View } from "react-native";
import { Button, Card, Divider, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { CategoryFormProps } from "./types";

const CategoryForm: FC<CategoryFormProps> = ({ index, name, fields }) => {
  const dispatch = useDispatch();

  const handleUpdateCategoryName = useCallback(
    (txt: string) => {
      dispatch(updateCategoryName({ index, newName: txt }));
      dispatch(updateInventoryName({ index, newName: txt }));
    },
    [dispatch, index],
  );

  const handleRemoveCategory = useCallback(() => {
    dispatch(updateCategories({ categoryIndex: index }));
    dispatch(updateInventories({ inventoryIndex: index }));
  }, [dispatch, index]);

  return (
    <View style={{ marginBottom: 10 }}>
      <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
        {name}
      </Text>

      <Divider />

      <Card
        style={{
          padding: 20,
          zIndex: 0,
          marginTop: 10,
          backgroundColor: "white",
        }}>
        <TextInput
          mode="outlined"
          label="Category Name"
          placeholder="New Category"
          value={name}
          style={{ marginBottom: 5 }}
          onChangeText={handleUpdateCategoryName}
        />

        {fields.map((field, idx) => {
          return (
            <DataField
              key={field.id}
              parentIndex={index}
              fieldIndex={idx}
              name={field.name}
              type={field.type}
            />
          );
        })}

        <TitleFieldDropdown parentIndex={index} />

        <AddNewFieldDropdown parentIndex={index} />

        <Button mode="contained" icon="delete" onPress={handleRemoveCategory}>
          Remove
        </Button>
      </Card>
    </View>
  );
};

export default CategoryForm;
