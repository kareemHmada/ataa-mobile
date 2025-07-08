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


import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import * as DeviceExpo from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api/api";
import AdminAccounts from "./screens/AdminAccounts";

// 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 
async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("فشل في الحصول على صلاحية الإشعارات!");
    return;
  }

  if (DeviceExpo.isDevice) {
    token = (await Notifications.getExpoPushTokenAsync()).data;

    // 
    try {
      const authToken = await AsyncStorage.getItem("token");
      if (authToken) {
        await api.post("/api/notifications/token", { fcm_token: token });
      }
    } catch (error) {
      console.log("Failed to send FCM token:", error.response?.data || error.message);
    }
  } else {
    alert("يجب تشغيل هذا على جهاز فعلي.");
  }
}

// -----------------------------------

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <JoinStackNav />
    </NavigationContainer>
  // <LoginScreen />


  );
}
