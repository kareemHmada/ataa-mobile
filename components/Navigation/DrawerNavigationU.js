import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import IconAntDesign from "../icon/IconAntDesign";
import IconFont from "../icon/IconFont";

import DashboardU from "../../screens/user/DashboardU";
import NewDonationU from "../../screens/user/NewDonationU";
import DonationU from "../../screens/user/DonationU";
import SettingsU from "../../screens/user/SettingsU";
import ChatStack from "./StackNavigationC";
import BottomTabs from "./BottomTabs";

export default function DrawerNavigationU() {
  const Drawer = createDrawerNavigator();

  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen
          name="DashboardU"
          component={DashboardU}
          options={{
            title: "Dash Board",
            drawerIcon: ({ color }) => {
              return <IconFont icon={"chart-line"} color={color} size={20} />;
            },sceneStyle: { marginBottom: 50 }
          }}
        />
        <Drawer.Screen
          name="DonationU"
          component={DonationU}
          options={{
            title: "Donation",
            drawerIcon: ({ color }) => {
              return (
                <IconFont icon={"hand-holding-heart"} color={color} size={20} />
              );
            },sceneStyle: { marginBottom: 50 }
          }}
        />
        <Drawer.Screen
          name="ChatStack"
          component={ChatStack}
          options={{
            title: "Messages",
            drawerIcon: ({ color }) => {
              return <IconFont icon={"envelope"} color={color} size={20} />;
            },sceneStyle: { marginBottom: 50 }
          }}
        />
        <Drawer.Screen
          name="NewDonationU"
          component={NewDonationU}
          options={{
            title: "New Donation",
            drawerIcon: ({ color }) => {
              return <IconFont icon={"circle-plus"} color={color} size={20} />;
            },sceneStyle: { marginBottom: 50 }
          }}
        />
        <Drawer.Screen
          name="SettingsU"
          component={SettingsU}
          options={{
            title: "Settings",
            drawerIcon: ({ color }) => {
              return <IconAntDesign icon={"setting"} color={color} size={20} />;
            },sceneStyle: { marginBottom: 50 }
          }}
        />
        <Drawer.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{
            headerShown: false,
            title: "Home",
            drawerIcon: ({ color }) => {
              return <IconAntDesign icon={"home"} color={color} size={20} />;
            },
          }}
        />
      </Drawer.Navigator>
    </>
  );
}
