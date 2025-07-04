import { createStackNavigator } from "@react-navigation/stack";

import MessagesN from '../../screens/ngo/MessagesN'
import ChatScreenN from "../../screens/ngo/chat/ChatScreenN";

const Stack = createStackNavigator();

export default function ChatStackCN() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ConversationsListOrg"
        component={MessagesN}
        options={{ title: "Messages" }}
      />
      <Stack.Screen
        name="ChatScreenOrg"
        component={ChatScreenN}
        options={{
          headerRight: () => {
            return ;
          },
        }}
      />
    </Stack.Navigator>
  );
}
