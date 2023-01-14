import { useRoute } from "@react-navigation/native";
import React, { FC } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-paper";

const InventoryX: FC = () => {
  const { name } = useRoute();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text>{name}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InventoryX;
