import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";

import SmallCard from "../../components/ui/SmallCard";
import MedicalReportCard from "../../components/ui/MedicalReportCard";
import api from "../../api/api"; // ملف api.js

export default function DashboardU({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const res = await api.get("/api/dashboard");

      setStats(res.data.status);

      const donationsData = res.data.donations || [];
      setDonations(donationsData);

      const completed = donationsData.filter((d) => d.status === "مكتمل").length;
      const inProgress = donationsData.filter((d) => d.status !== "مكتمل").length;

      setStats({
        total: donationsData.length,
        completed,
        inProgress,
      });

      const req = await api.get("/api/donation-requests");
      setRequests(req.data.data || []);

    } catch (error) {
      console.error(
        "DashboardU error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ✅ زرار Accept Donation
  const handleAcceptDonation = async (id) => {
    try {
      await api.put(`/api/donations/${id}/change-status`, { status: "مكتمل" });
      Alert.alert("Success", "Donation status updated to مكتمل");
      fetchDashboardData();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Failed to update donation");
    }
  };

  // ✅ زرار Cancel Donation
  const handleCancelDonation = async (id) => {
    try {
      await api.delete(`/api/donations/${id}`);
      Alert.alert("Deleted", "Donation deleted");
      fetchDashboardData();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Failed to delete donation");
    }
  };

  // ✅ زرار Accept Request
  const handleAcceptRequest = async (id) => {
    try {
      await api.put(`/api/donation-requests/${id}/status`, {
        status: "Approved", // ✅ هنا لازم تبعته Approved مش Received
      });
      Alert.alert("Success", "Request status updated to Approved");
      fetchDashboardData();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Failed to update request");
    }
  };

  // ✅ زرار Cancel Request
  const handleCancelRequest = async (id) => {
    try {
      await api.delete(`/api/donation-requests/${id}`);
      Alert.alert("Deleted", "Request deleted");
      fetchDashboardData();
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Failed to delete request");
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2356D5" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.summaryContainer}>
        <SmallCard
          titl={"Total Donations"}
          value={stats.total}
          icon={"hand-holding-heart"}
          color={"#4CAF50"}
          size={18}
        />
        <SmallCard
          titl={"Completed Donations"}
          value={stats.completed}
          icon={"check-circle"}
          color={"#4CAF50"}
          size={18}
        />
        <SmallCard
          titl={"Donations In Progress"}
          value={stats.inProgress}
          icon={"clock"}
          color={"#4CAF50"}
          size={18}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Donations</Text>
        </View>

        {donations.length === 0 ? (
          <Text style={styles.donationTime}>No donations yet.</Text>
        ) : (
          donations.map((item) => (
            <MedicalReportCard
              key={item.id}
              title={item.title}
              date={item.created_at}
              status={item.status}
              onPressDetails={() =>
                navigation.navigate("DonationDetails", { id: item.id })
              }
              onAcceptance={() => handleAcceptDonation(item.id)}
              onCancel={() => handleCancelDonation(item.id)}
              but1={true}
              but2={false}
              but3={true}
            />
          ))
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Requests from Associations</Text>
        </View>

        {requests.length === 0 ? (
          <Text style={styles.donationTime}>No requests yet.</Text>
        ) : (
          requests.map((item) => (
            <MedicalReportCard
              key={item.id}
              title={item.type}
              date={item.condition}
              status={item.status}
              onPressDetails={() =>
                navigation.navigate("DonationRequestsDetails", { id: item.id })
              }
              onAcceptance={() => handleAcceptRequest(item.id)}
              onCancel={() => handleCancelRequest(item.id)}
              but1={true}
              but2={true}
              but3={false}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  donationTime: {
    fontSize: 12,
    color: "#999",
  },
});
