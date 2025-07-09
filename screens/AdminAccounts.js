import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdminAccounts() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadUsers = async () => {
    try {
      const res = await api.get("/api/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Failed to load users");
    }
  };

  const loadDonations = async () => {
    try {
      const res = await api.get("/api/admin/donations");
      setDonations(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Failed to load donations");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (activeTab === "users") {
      await loadUsers();
    } else {
      await loadDonations();
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadUsers();
    loadDonations();
  }, []);

  const verifyUser = async (id) => {
    try {
      await api.post(`/api/admin/users/${id}/verify`);
      Alert.alert("Success", "User verified");
      loadUsers();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Failed to verify user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/api/admin/users/${id}`);
      Alert.alert("Success", "User deleted");
      loadUsers();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Failed to delete user");
    }
  };

  const changeDonationStatus = async (id) => {
    try {
      await api.post(`/api/admin/donations/${id}/change-status`);
      Alert.alert("Success", "Donation status updated");
      loadDonations();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Failed to update donation status");
    }
  };

  const deleteDonation = async (id) => {
    try {
      await api.delete(`/api/admin/donations/${id}`);
      Alert.alert("Success", "Donation deleted");
      loadDonations();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Failed to delete donation");
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "cancel", style: "cancel" },
        {
          text: "logout",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            navigation.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Panel</Text>

      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tabButton, activeTab === "users" && styles.activeTab]}
          onPress={() => setActiveTab("users")}
        >
          <Text style={styles.tabText}>Users</Text>
        </Pressable>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === "donations" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("donations")}
        >
          <Text style={styles.tabText}>Donations</Text>
        </Pressable>
      </View>

      {activeTab === "users" ? (
        <View style={styles.summaryContainer}>
          <Text style={styles.subheading}>Users</Text>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text>Name: {item.name}</Text>
                <Text>Email: {item.email}</Text>
                <Text>
                  Verified: {item.email_verified_at ? "✅" : "❌"}
                </Text>
                <View style={styles.buttonsRow}>
                  {!item.email_verified_at && (
                    <Pressable
                      style={styles.button}
                      onPress={() => verifyUser(item.id)}
                    >
                      <Text style={styles.buttonText}>Verify</Text>
                    </Pressable>
                  )}
                  <Pressable
                    style={[styles.button, { backgroundColor: "#ff4d4d" }]}
                    onPress={() => deleteUser(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.summaryContainer}>
          <Text style={styles.subheading}>Donations</Text>
          <FlatList
            data={donations}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text>Title: {item.title}</Text>
                <Text>Status: {item.status}</Text>
                <View style={styles.buttonsRow}>
                  <Pressable
                    style={[styles.button, { backgroundColor: "#3399ff" }]}
                    onPress={() => changeDonationStatus(item.id)}
                  >
                    <Text style={styles.buttonText}>Change Status</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, { backgroundColor: "#ff4d4d" }]}
                    onPress={() => deleteDonation(item.id)}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
      )}

      <View style={styles.buttonContainerLog}>
        <Text
          style={[styles.buttonLog, { backgroundColor: "#d9534f" }]}
          onPress={handleLogout}
        >
          Logout
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f2f2f2",
    marginBottom: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  activeTab: { backgroundColor: "#4CAF50" },
  tabText: { color: "#fff", fontWeight: "bold" },
  summaryContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flex: 1,
  },
  subheading: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  buttonsRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  buttonText: { color: "#fff" },
  buttonContainerLog: { marginTop: 10 },
  buttonLog: {
    backgroundColor: "#2356D5",
    color: "#fff",
    padding: 12,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
});
