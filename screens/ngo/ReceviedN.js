import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Picker, 
} from "react-native";
import api from "../../api/api";
import ReceviedCard from "../../components/ui/ReceviedCard";

export default function ReceviedN() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/donation-requests");
      setRequests(res.data);
      applyFilter(res.data, statusFilter);
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
    <View style={{ flex: 1 }}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Status:</Text>
        <Picker
          selectedValue={statusFilter}
          style={styles.picker}
          onValueChange={onFilterChange}
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
            <ReceviedCard
              imageUrl={item.images?.[0]}
              description={item.description}
              quantity={item.quantity}
              type={item.type}
              location={item.location}
              status={item.status}
            />
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterContainer: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
});
