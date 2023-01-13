import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { SafeAreaView, Text } from "react-native";

const App: FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <Text>Hello</Text>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
