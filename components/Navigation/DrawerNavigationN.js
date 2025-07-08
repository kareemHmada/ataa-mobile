import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DashboardN from "../../screens/ngo/DashboardN";
import NewRequestN from "../../screens/ngo/NewRequestN";

import IconFont from "../icon/IconFont";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ReceviedN from "../../screens/ngo/ReceviedN";
import SettingsN from "../../screens/ngo/SettingsN";
import IconAntDesign from "../icon/IconAntDesign";
import ChatStackCN from "./StackNavigationCN";
import BottomTabs from "./BottomTabs";

export default function DrawerNavigationN() {
  const Drawer = createDrawerNavigator();

  return (
    <>
      <Drawer.Navigator >
        <Drawer.Screen
          name="DashboardN"
          component={DashboardN}
          options={{
            title: "Dash Board",
            drawerIcon: ({ color }) => {
              return <IconFont icon={"chart-line"} color={color} size={20} />;
            },sceneStyle: { marginBottom: 50 }
          }}
        />
        <Drawer.Screen
          name="NewRequestN"
          component={NewRequestN}
          options={{
            title: "New Request",
            drawerIcon: ({ color }) => {
              return (
                <IconFont icon={"hand-holding-heart"} color={color} size={20} />
              );
            },sceneStyle: { marginBottom: 50 }
          }}
        />
          <Drawer.Screen
            name="ReceviedN"
            component={ReceviedN}
            options={{
              title: "Requests",
              drawerIcon: ({ color }) => {
                return <FontAwesome5 name="donate" size={20} color={color} />;
              },sceneStyle: { marginBottom: 50 }
            }}
          />
        <Drawer.Screen
          name="ChatStackCN"
          component={ChatStackCN}
          options={{
            title: "Messages",
            drawerIcon: ({ color }) => {
              return <IconFont icon={"envelope"} color={color} size={20} />;
            },sceneStyle: { marginBottom: 50 }
          }}
        />
        <Drawer.Screen
          name="SettingsN"
          component={SettingsN}
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
