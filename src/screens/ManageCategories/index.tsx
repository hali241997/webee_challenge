import {
  addEmptyCategory,
  Category,
  useCategories,
} from "@appstate/categories";
import { FieldType } from "@appstate/common/types";
import { addInventory } from "@appstate/inventories";
import CategoryForm from "@components/CategoryForm";
import React, { FC, useCallback } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import uuid from "react-native-uuid";
import { useDispatch } from "react-redux";
import styles from "./styles";

const ManageCategories: FC = () => {
  const { categories } = useCategories();
  const dispatch = useDispatch();

  const showAddNewCategoryForm = useCallback(() => {
    const nameId = uuid.v4().toString();
    const fieldId = uuid.v4().toString();
    dispatch(
      addEmptyCategory({
        id: nameId,
        name: "New Category",
        fields: [
          {
            id: fieldId,
            type: FieldType.TEXT,
            name: "",
            isTitle: false,
          },
        ],
      }),
    );

    dispatch(
      addInventory({
        id: nameId,
        name: "New Category",
        fields: [
          {
            id: fieldId,
            type: FieldType.TEXT,
            name: "",
            isTitle: false,
            value: "",
          },
        ],
      }),
    );
  }, [dispatch]);

  if (categories.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text variant="headlineLarge" style={styles.emptyText}>
          You don&apos;t have any categories
        </Text>

        <Button mode="contained" onPress={showAddNewCategoryForm}>
          Add Now
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ marginHorizontal: 10, flex: 1 }}>
      <ScrollView style={{ flex: 1, marginBottom: 40 }}>
        {categories.map((category: Category, index: number) => {
          return (
            <CategoryForm
              key={category.id}
              index={index}
              name={category.name}
              fields={category.fields}
            />
          );
        })}
      </ScrollView>
      <SafeAreaView>
        <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
          <Button mode="contained" onPress={showAddNewCategoryForm}>
            Add New Category
          </Button>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ManageCategories;
