import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import api from "../../api/api";
import MedicalEquipmentCard from "../../components/ui/MedicalEquipmentCard";

export default function ReceviedN({ navigation }) {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/api/donation-requests");
      // لاحظ هنا البيانات جوه `data`
      const fetchedData = res.data.data || [];
      setRequests(fetchedData);
      applyFilter(fetchedData, statusFilter);
    } catch (err) {
      console.error("Error fetching donation requests:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const applyFilter = (data, status) => {
    if (status === "All") {
      setFiltered(data);
    } else {
      const filteredData = data.filter((item) => item.status === status);
      setFiltered(filteredData);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
  };

  const onFilterChange = (value) => {
    setStatusFilter(value);
    applyFilter(requests, value);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Status:</Text>
        <Picker
          selectedValue={statusFilter}
          onValueChange={onFilterChange}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Approved" value="Approved" />
          <Picker.Item label="Rejected" value="Rejected" />
        </Picker>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{marginHorizontal:10}}  >
            <MedicalEquipmentCard
              title={item.type}
              description={item.description}
              status={item.status}
              imageUrl={item.images?.[0]}
              quantity={item.quantity}
              location={item.location}
              onPressDetails={() => navigation.navigate("DonationRequestsDetails", item)}
              but1={true}
            />
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text>No donation requests found.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  filterContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom:20,
    borderRadius: 10 
  },
  filterLabel: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  picker: { backgroundColor: "#f0f0f0", borderRadius: 5 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
