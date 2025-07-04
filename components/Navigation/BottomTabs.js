import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Contact from "../../screens/Contact";
import Device from "../../screens/Device";
import Home from "../../screens/Home";
import IconAntDesign from "../icon/IconAntDesign";
import IconFont from "../icon/IconFont";

const BottomTap = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <>
      <BottomTap.Navigator>
        <BottomTap.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <IconAntDesign icon={"home"} color={color} size={size} />
            ),
          }}
        />
        <BottomTap.Screen
          name="Contact"
          component={Contact}
          options={{
            tabBarIcon: ({ color, size }) => (
              <IconAntDesign icon={"phone"} color={color} size={size} />
            ),
          }}
        />
        <BottomTap.Screen
          name="Device"
          component={Device}
          options={{
            tabBarIcon: ({ color, size }) => (
              <IconFont icon={"laptop-medical"} color={color} size={size} />
            ),
          }}
        />
      </BottomTap.Navigator>
    </>
  );
}
