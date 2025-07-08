import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import MedicalEquipmentCard from "../../components/ui/MedicalEquipmentCard";
import api from "../../api/api";

export default function DonationU({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [donations, setDonations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const filteredItems = searchQuery
    ? donations.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : donations;

  const fetchDonations = async () => {
    try {
      const res = await api.get("/api/donations");
      setDonations(res.data);
    } catch (error) {
      console.log(
        "Error loading donations:",
        error.response?.data || error.message
      );
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDonations();
  };

  useEffect(() => {
    const focusListener = navigation.addListener("focus", fetchDonations);
    return focusListener;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search donations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredItems.map((item) => (
          <MedicalEquipmentCard
            key={item.id}
            title={item.title}
            category={item.category}
            status={item.status}
            description={item.description}
            imageUrl={item.img}
            onPressDetails={() => navigation.navigate("DonationDetails", item)}
            but1={true}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  searchContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
});
