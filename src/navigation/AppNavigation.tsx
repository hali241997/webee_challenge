import { useInventories } from "@appstate/inventories";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "@screens/Dashboard";
import InventoryX from "@screens/InventoryX";
import ManageCategories from "@screens/ManageCategories";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";

const Drawer = createDrawerNavigator();

const AppNavigation: FC = () => {
  const { inventories } = useInventories();

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: "clear" });
  // }, []);

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {inventories.map(inventory => {
        if (inventory.name && inventory.name !== "New Category") {
          return (
            <Drawer.Screen
              key={inventory.name}
              name={inventory.name}
              component={InventoryX}
            />
          );
        }
      })}
      <Drawer.Screen name="Manage Categories" component={ManageCategories} />
    </Drawer.Navigator>
  );
};

export default AppNavigation;
