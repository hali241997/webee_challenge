import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { SafeAreaView, Text } from "react-native";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const App: FC = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <SafeAreaView>
          <Text>Hello</Text>
          <Icon name="home" size={20} />
          <ActivityIndicator animating />
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
