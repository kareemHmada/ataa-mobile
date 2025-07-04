import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreenU from "./screens/user/SignupScreenU";
import WelcomeScreen from "./screens/AccountTypeScreen";
// import { Colors } from './constants/styles';
import SignupScreenN from "./screens/ngo/SignupScreenN";
import AccountTypeScreen from "./screens/AccountTypeScreen";
import DashboardN from "./screens/ngo/DashboardN";
import DrawerNavigationN from "./components/Navigation/DrawerNavigationN";
import DrawerNavigationU from "./components/Navigation/DrawerNavigationU";
import { View } from "react-native";
import Device from "./screens/Device";
import Contact from "./screens/Contact";
import BottomTabs from "./components/Navigation/BottomTabs";
import JoinStackNav from "./components/Navigation/JoinStackNav";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "white" },
        headerShown: false,
      }}
    >
      <Stack.Screen name="DashboardN" component={DashboardN} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        // contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

// function Navigation() {
//   return (

//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
    
    <JoinStackNav /> 

    </NavigationContainer>
  );
}
