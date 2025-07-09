import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../api/api";
import HomeCard from "../components/ui/HomeCard";

export default function Home() {
  const navigation = useNavigation();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const fetchStats = async () => {
    try {
      const res = await api.get("/api/home-stats");
      setStats(res.data);
    } catch (error) {
      console.log("Error fetching stats:", error);
      Alert.alert("Error", "Data retrieval failed");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
  };

  return (
    <View style={styles.appContainer}>
      <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
      
      >
        <View style={styles.container}>
          <Image
            source={require("../assets/Ataa.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.title}>Attaa</Text>
          <Text style={styles.desc}>
            We seek to spread the culture of giving and social solidarity by
            connecting donors with those in need.
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("DrawerNavigationU")}
            >
              <Text style={styles.buttonText}>Donor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("DrawerNavigationN")}
            >
              <Text style={styles.buttonText}>Charity</Text>
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
        ) : (
          <>
            <View style={styles.row}>
              <HomeCard titl={"Donors"} value={"+ " + stats.donors} />
              <HomeCard titl={"Beneficiaries"} value={"+ " + stats.receivers} />
            </View>
            <View style={{ alignItems: "center" }}>
              <HomeCard titl={"Pound Donations"} value={"+" + stats.total_donated + " EGP"} />
            </View>
          </>
        )}

        <Text style={styles.howTitle}>How we work</Text>

        <View style={styles.row}>
          <HomeCard
            titl={"We accurately record and document the needy cases."}
            value={"Case registration"}
          />
          <HomeCard
            titl={"We directly connect donors with needy cases."}
            value={"Connect donors"}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <HomeCard
            titl={"We follow up on cases and document the assistance provided."}
            value={"Follow up and document"}
          />
        </View>

        <View style={styles.donateSection}>
          <Text style={styles.donateTitle}>Be part of the change</Text>
          <Text style={styles.donateDesc}>
            Contribute with us in spreading the culture of giving and social solidarity.
          </Text>
          <TouchableOpacity
            style={styles.donateButton}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.donateButtonText}>Join us now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2255D3",
    marginTop: 100,
    paddingVertical: 40,
    marginHorizontal: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  desc: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    color: "#fff",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  howTitle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  donateSection: {
    backgroundColor: "#2563eb",
    marginTop: 30,
    padding: 25,
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 30,
  },
  donateTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  donateDesc: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center",
  },
  donateButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  donateButtonText: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 16,
  },
});