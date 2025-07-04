import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function Device() {
  const navigation = useNavigation();

  const handleDonatePress = () => {
    navigation.navigate("NewDonationU");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Devices</Text>
        <Text style={styles.headerSubtitle}>
          We provide the latest devices and technologies to serve those in need
        </Text>
      </View>

      {/* Medical Devices */}
      <Text style={styles.sectionTitle}>Medical Devices</Text>
      <View style={styles.cardsRow}>
        <DeviceCard
          icon="test-tube"
          title="Glucose Meter"
          desc="Accurate blood sugar level measurement device"
        />
        <DeviceCard
          icon="heart-pulse"
          title="Blood Pressure Monitor"
          desc="Digital blood pressure measuring device"
        />
        <DeviceCard
          icon="cloud"
          title="Oxygen Meter"
          desc="Device for measuring blood oxygen levels"
        />
      </View>

      {/* Educational Devices */}
      <Text style={styles.sectionTitle}>Educational Devices</Text>
      <View style={styles.cardsRow}>
        <DeviceCard
          icon="book-open-variant"
          title="Educational Kits"
          desc="Special educational devices for students"
        />
        <DeviceCard
          icon="laptop"
          title="Laptops"
          desc="Laptop computers for schools"
        />
        <DeviceCard
          icon="monitor"
          title="Projectors"
          desc="Projection devices for lessons and lectures"
        />
      </View>

      {/* Donate Section */}
      <View style={styles.donateSection}>
        <Text style={styles.donateTitle}>Contribute to Providing Devices</Text>
        <Text style={styles.donateDesc}>
          You can help provide more devices for those in need
        </Text>
        <TouchableOpacity style={styles.donateButton} onPress={handleDonatePress}>
          <Text style={styles.donateButtonText}>Donate Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function DeviceCard({ icon, title, desc }) {
  return (
    <View style={styles.card}>
      <Icon name={icon} size={40} color="#bbb" style={{ marginBottom: 10 }} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
      <Text style={styles.cardFooter}>15 days ago</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },
  header: { backgroundColor: "#2563eb", padding: 30, alignItems: "center" },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerSubtitle: { color: "#fff", fontSize: 16 },
  sectionTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 18,
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: 110,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginHorizontal: 2,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
    textAlign: "center",
  },
  cardDesc: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginBottom: 8,
  },
  cardFooter: { fontSize: 10, color: "#888", textAlign: "center" },
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
  donateDesc: { color: "#fff", fontSize: 14, marginBottom: 15 },
  donateButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  donateButtonText: { color: "#2563eb", fontWeight: "bold", fontSize: 16 },
});
