import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GroupInfo from "./src/pages/GroupInfo";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import ProductDetails from "./src/pages/ProductDetails";
import { colors } from "./src/styles/theme";

const Stack = createNativeStackNavigator();

function HeaderButton({ label, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress} style={styles.headerButton}>
      <Text style={styles.headerButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />

      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: colors.white,
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
          contentStyle: styles.content,
        }}
      >
        <Stack.Screen
          component={Login}
          name="Login"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={Home}
          name="Home"
          options={({ navigation }) => ({
            title: "Produtos",
            headerLeft: () => (
              <HeaderButton
                label="Logout"
                onPress={() => navigation.replace("Login")}
              />
            ),
            headerRight: () => (
              <HeaderButton
                label="Info"
                onPress={() => navigation.navigate("GroupInfo")}
              />
            ),
          })}
        />

        <Stack.Screen
          component={ProductDetails}
          name="ProductDetails"
          options={{ title: "Detalhes do Produto" }}
        />

        <Stack.Screen
          component={GroupInfo}
          name="GroupInfo"
          options={{ title: "Informacoes do Grupo" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "800",
  },
  headerButton: {
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headerButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "800",
  },
});
