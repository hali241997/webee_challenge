import { createDrawerNavigator } from "@react-navigation/drawer";
import Dashboard from "@screens/Dashboard";
import ManageCategories from "@screens/Manage Categories";
import React, { FC } from "react";

const Drawer = createDrawerNavigator();

const AppNavigation: FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Manage Categories" component={ManageCategories} />
    </Drawer.Navigator>
  );
};

export default AppNavigation;
