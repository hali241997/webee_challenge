import { useInventories } from "@appstate/inventories";
import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";

const Dashboard: FC = () => {
  const { inventories } = useInventories();

  if (inventories.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="headlineLarge" style={styles.emptyText}>
          You don&apos;t have any inventories
        </Text>
      </View>
    );
  }

  return null;
};

export default Dashboard;
