import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState, useLayoutEffect } from "react";
import api from "../api/api";
import DonationDetailsCard from "../components/ui/DonationDetailsCard";

export default function DonationDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDonation = async () => {
    try {
      const res = await api.get(`/api/donations/${id}`);
      setDonation(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonation();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: donation ? donation.title : "Donation Detail",
    });
  }, [navigation, donation]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2356D5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DonationDetailsCard data={donation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
