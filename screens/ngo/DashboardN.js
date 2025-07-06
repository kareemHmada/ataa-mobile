import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import api from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SmallCard from "../../components/ui/SmallCard";

export default function DashboardN() {
  const [stats, setStats] = useState({
    total: 0,
    messages: 0,
    accepted: 0,
    pending: 0,
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get("/api/auth/dashboard"); //API
      setStats(res.data.status);
      setRecent(res.data.recent_donations);
    } catch (error) {
      console.error("Dashboard load error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
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
    <ScrollView style={styles.container}>
      <View style={styles.summaryContainer}>
        <SmallCard
          titl={"Total Donations"}
          value={stats.total}
          icon={"clipboard"}
          color={"#000"}
          size={18}
        />
        <SmallCard
          titl={"New Messages"}
          value={stats.messages}
          icon={"message"}
          color={"#000"}
          size={18}
        />
        <SmallCard
          titl={"Accepted Donations"}
          value={stats.accepted}
          icon={"check-circle"}
          color={"#000"}
          size={18}
        />
        <SmallCard
          titl={"Pending Donations"}
          value={stats.pending}
          icon={"circle-dollar-to-slot"}
          color={"#000"}
          size={18}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Donations</Text>
        </View>

        {recent.length === 0 ? (
          <Text style={styles.donationTime}>No donations yet.</Text>
        ) : (
          recent.map((item, index) => (
            <View key={index} style={styles.donationItem}>
              <Text style={styles.donationTitle}>{item.title}</Text>
              <Text style={styles.donationTime}>{item.time_ago}</Text>
              {item.status && (
                <Text style={styles.donationDescription}>
                  Status: {item.status}
                </Text>
              )}
            </View>
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
  donationItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
  },
  donationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 3,
  },
  donationDescription: {
    fontSize: 14,
    color: "#666",
  },
  donationTime: {
    fontSize: 12,
    color: "#999",
  },
});
