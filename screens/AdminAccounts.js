import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import api from "../api/api"; // Laravel API instance
import SmallCard from "../components/ui/SmallCard";

export default function AdminAccounts() {
  const [activeTab, setActiveTab] = useState("users");

  const [users, setUsers] = useState([
    { id: "1", name: "Kamal Mohamed", verified: false },
    { id: "2", name: "Mohamed Ibrahim", verified: true },
    { id: "3", name: "Habiba Ali", verified: false },
  ]);

  const [donations, setDonations] = useState([
    { id: "1", donor: "Kamal Mohamed", status: "Pending" },
    { id: "2", donor: "Mohamed Ibrahim", status: "Pending" },
  ]);

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const verifyUser = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, verified: true } : u))
    );
  };

  const changeDonationStatus = (id) => {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          let newStatus =
            d.status === "Pending"
              ? "Completed"
              : d.status === "Completed"
              ? "Received"
              : "Pending";
          return { ...d, status: newStatus };
        }
        return d;
      })
    );
  };

  const deleteDonation = (id) => {
    setDonations((prev) => prev.filter((d) => d.id !== id));
  };

  const confirmDonation = (id) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Confirmed" } : d))
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
        <>
          <View style={styles.summaryContainer}>
            <Text style={styles.subheading}>Users</Text>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text>{item.name}</Text>
                  <Text>
                    Status: {item.verified ? "Verified ✅" : "Not Verified ❌"}
                  </Text>
                  <View style={styles.buttonsRow}>
                    {!item.verified && (
                      <Pressable
                        style={styles.button}
                        onPress={() => verifyUser(item.id)}
                      >
                        <Text style={styles.buttonText}>Verify</Text>
                      </Pressable>
                    )}
                    <Pressable
                      style={[
                        styles.button,
                        {
                          backgroundColor: "#ff4d4d",
                          marginLeft: item.verified ? "auto" : 0,
                        },
                      ]}
                      onPress={() => deleteUser(item.id)}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.summaryContainer}>
            <Text style={styles.subheading}>Donations</Text>
            <FlatList
              data={donations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Text>Donor: {item.donor}</Text>
                  <Text>Status: {item.status}</Text>
                  <View style={styles.buttonsRow}>
                    <Pressable
                      style={[styles.button, { backgroundColor: "#3399ff" }]}
                      onPress={() => changeDonationStatus(item.id)}
                    >
                      <Text style={styles.buttonText}>Change Status</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, { backgroundColor: "#4CAF50" }]}
                      onPress={() => confirmDonation(item.id)}
                    >
                      <Text style={styles.buttonText}>Confirm</Text>
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f2f2f2",
  },
    summaryContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
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
    padding: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#4CAF50",
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
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
  buttonText: {
    color: "#fff",
  },
});
