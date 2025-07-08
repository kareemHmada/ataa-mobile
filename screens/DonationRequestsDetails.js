import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState, useLayoutEffect } from "react";
import api from "../api/api";
import DonationRequestCard from "../components/ui/DonationRequestCard";

export default function DonationRequestDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [donationRequest, setDonationRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDonationRequest = async () => {
    try {
      const res = await api.get(`/api/donation-requests/${id}`);
      setDonationRequest(res.data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonationRequest();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: donationRequest ? donationRequest.type : "Request Detail",
    });
  }, [navigation, donationRequest]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2356D5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DonationRequestCard item={donationRequest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
