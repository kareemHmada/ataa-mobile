import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api/api"; 

export default function MessagesU({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      const res = await api.get("/conversations");
      setConversations(res.data);
    } catch (err) {
      console.log("Failed to fetch conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const filteredConversations = conversations.filter((conv) =>
    conv.receiver?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToChat = (item) => {
    const formatted = {
      id: item.id,
      name: item.receiver?.name || "Unknown",
      avatar: "https://ui-avatars.com/api/?name=" + item.receiver?.name,
    };
    navigation.navigate("ChatScreen", { conversation: formatted });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={filteredConversations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              style={styles.conversationItem}
              onPress={() => goToChat(item)}
            >
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri:
                      "https://ui-avatars.com/api/?name=" +
                      (item.receiver?.name || "User"),
                  }}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.receiver?.name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {item.latest_message?.text || "No messages yet"}
                </Text>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No conversations found</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  conversationItem: {
    flexDirection: "row",
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#efefef",
    alignItems: "center",
    borderRadius: 8,
  },
  avatarContainer: {
    marginLeft: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "right",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});
