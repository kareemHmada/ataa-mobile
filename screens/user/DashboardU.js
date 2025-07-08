import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import SmallCard from "../../components/ui/SmallCard";
import MedicalReportCard from "../../components/ui/MedicalReportCard";
import api from "../../api/api"; // api.js

export default function DashboardU({navigation}) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]); // ✅ requests state
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
  });

  const fetchDashboardData = async () => {
    try {
      // 📌 donations + recent from dashboard API
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

      // 📌 requests from another API (association requests)
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
              onPressDetails={() => navigation.navigate("DonationDetails", { id: item.id })}
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
              onPressDetails={() => navigation.navigate("DonationRequestsDetails", { id: item.id })}
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
