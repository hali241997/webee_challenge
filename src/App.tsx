import { persistor, store } from "@appstate/store";
import AppNavigation from "@navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <PaperProvider>
            <AppNavigation />
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
