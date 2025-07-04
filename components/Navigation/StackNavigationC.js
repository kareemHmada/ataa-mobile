import { createStackNavigator } from "@react-navigation/stack";

import MessagesU from "../../screens/user/MessagesU";
import ChatScreenU from "../../screens/user/chat/ChatScreenU";

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ConversationsList"
        component={MessagesU}
        options={{ title: "Messages" }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreenU}
        options={{
          headerRight: () => {
            return ;
          },
        }}
      />
    </Stack.Navigator>
  );
}
