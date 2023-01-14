import { store } from "@appstate/store";
import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { SafeAreaView } from "react-native";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider } from "react-redux";

const AppWrapper: FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <SafeAreaView>
            <Icon name="home" size={20} />
            <ActivityIndicator animating />
          </SafeAreaView>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default AppWrapper;
