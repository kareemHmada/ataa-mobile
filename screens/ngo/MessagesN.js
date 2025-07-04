import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import api from "../../api/api"; 

export default function MessagesN({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await api.get("/conversations");
      setConversations(res.data);
    } catch (err) {
      console.log("Error fetching conversations:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.receiver?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.conversationItem}
            onPress={() =>
              navigation.navigate("ChatScreenOrg", {
                conversationId: item.id,
                receiver: item.receiver,
              })
            }
          >
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: item.receiver?.avatar || "https://via.placeholder.com/50",
                }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.receiver?.name}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.latest_message?.content || "No messages yet"}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>No conversations found</Text>
          )
        }
      />
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
    marginRight: 10,
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
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});
