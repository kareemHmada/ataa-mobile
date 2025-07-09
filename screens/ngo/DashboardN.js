import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import api from "../../api/api";
import SmallCard from "../../components/ui/SmallCard";
import MedicalReportCard from "../../components/ui/MedicalReportCard";

export default function DashboardN({ navigation }) {
  const [stats, setStats] = useState({
    total: 0,
    messages: 0,
    accepted: 0,
    pending: 0,
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get("/api/donations");

      setRecent(res.data);

      setStats({
        total: res.data.length,
        messages: 0,
        accepted: res.data.filter((d) => d.status === "مقبول" || d.status === "Accepted").length,
        pending: res.data.filter((d) => d.status === "قيد الانتظار" || d.status === "Pending").length,
      });
    } catch (error) {
      console.error("Dashboard load error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
  };

  // ✅ دوال التغيير الجديدة
  const handleAcceptance = async (id) => {
    try {
      await api.post(`/api/admin/donations/${id}/change-status`);
      setRecent((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Acceptance error:", error.response?.data || error.message);
    }
  };

  const handleCancel = async (id) => {
    try {
      await api.delete(`/api/admin/donations/${id}`);
      setRecent((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
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
          <Text style={styles.sectionTitle}>Donation Requests</Text>
        </View>

        {recent.length === 0 ? (
          <Text style={styles.donationTime}>No donations yet.</Text>
        ) : (
          recent.map((item) => (
            <MedicalReportCard
              key={item.id}
              title={item.title}
              date={item.date}
              status={item.status}
              onPressDetails={() => navigation.navigate("DonationDetails", item)}
              onAcceptance={() => handleAcceptance(item.id)}
              onCancel={() => handleCancel(item.id)}
              but1={true}
              but2={true}
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
