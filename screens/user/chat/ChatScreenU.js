import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../api/api";
import BackBtu from "../../../components/ui/BackBut";

export default function ChatScreenU({ route, navigation }) {
  const { conversation } = route.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const flatListRef = useRef();

  useEffect(() => {
    AsyncStorage.getItem("user").then((u) => {
      if (u) setAuthUser(JSON.parse(u));
    });
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/conversations/${conversation.id}/messages`);
        const msgs = res.data.map((msg) => ({
          id: msg.id,
          text: msg.text,
          sender: msg.sender_id === authUser?.id ? "me" : "other",
          time: new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setMessages(msgs.reverse());
      } catch (err) {
        console.log("Error loading messages", err);
      }
    };

    if (authUser) fetchMessages();
  }, [authUser]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const temp = {
      id: Date.now().toString(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [temp, ...prev]);
    setMessage("");

    try {
      await api.post(`/conversations/${conversation.id}/messages`, {
        text: message,
      });
    } catch (err) {
      console.log("Error sending message", err);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me" ? styles.myMessage : styles.theirMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <BackBtu screen={"MessagesU"} />
          <View style={{ flexDirection: "row", marginTop: 6 }}>
            <Text style={styles.chatName}>{conversation.name}</Text>
            <View style={{ paddingLeft: 5 }}>
              <Image
                source={{ uri: conversation.avatar }}
                style={styles.chatAvatar}
              />
            </View>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          inverted
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            placeholderTextColor="#999"
          />
          <Pressable style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between",
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  chatName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    textAlign: "left",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
