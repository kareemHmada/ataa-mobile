import { createStackNavigator } from "@react-navigation/stack";

import BottomTabs from "./BottomTabs";
import AccountTypeScreen from "../../screens/AccountTypeScreen";
import LoginScreen from "../../screens/LoginScreen";
import SignupScreenU from "../../screens/user/SignupScreenU";
import SignupScreenN from "../../screens/ngo/SignupScreenN";
import DrawerNavigationN from "./DrawerNavigationN";
import DrawerNavigationU from "./DrawerNavigationU";
import AdminAccounts from "../../screens/AdminAccounts";

const Stack = createStackNavigator();

export default function JoinStackNav() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTabs" component={BottomTabs}  />
        <Stack.Screen name="AdminAccounts" component={AdminAccounts}  />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AccountTypeScreen" component={AccountTypeScreen} />
        <Stack.Screen name="SignupScreenN" component={SignupScreenN} />
        <Stack.Screen name="SignupScreenU" component={SignupScreenU} />
        <Stack.Screen name="DrawerNavigationN" component={DrawerNavigationN} />
        <Stack.Screen name="DrawerNavigationU" component={DrawerNavigationU} />
      </Stack.Navigator>
    </>
  );
}
