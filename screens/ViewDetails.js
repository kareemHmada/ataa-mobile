import { View, StyleSheet, Image, Text, ScrollView, FlatList } from "react-native";
import { useEffect, useState } from "react";
import api from "../api/api"; 

export default function AboutMealGrid() {
  const [receivedDonations, setReceivedDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await api.get("/donation-requests");
      setReceivedDonations(res.data);
    } catch (error) {
      console.log("Error fetching donation requests:", error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Donor: {item.user?.name || "Anonymous"}</Text>
      <Text style={styles.text}>Type: {item.type}</Text>
      <Text style={styles.text}>Quantity: {item.quantity}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <Text style={styles.text}>Condition: {item.condition}</Text>
      <Text style={styles.text}>Location: {item.location || "Not specified"}</Text>
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <Text style={styles.header}>Received Donation Requests</Text>
      <FlatList
        data={receivedDonations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#f0f0f0",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
  },
});
