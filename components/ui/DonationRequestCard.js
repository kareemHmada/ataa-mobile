import { View, Text, Image, StyleSheet } from "react-native";
import api from "../../api/api";

export default function DonationRequestCard({ item }) {
  // حط لينك placeholder افتراضي
  const placeholderImage =
    "https://via.placeholder.com/300x200.png?text=No+Image";

  const imageUri = item?.images && item.images.length > 0
    ? `${api.defaults.baseURL}/storage/${item.images[0]}`
    : placeholderImage;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{item.type}</Text>
      <Text style={styles.text}>Condition: {item.condition}</Text>
      <Text style={styles.text}>Description: {item.description || "No Description"}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      {item.location && <Text style={styles.text}>Location: {item.location}</Text>}
      {item.notes && <Text style={styles.text}>Notes: {item.notes}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
    color: "#555",
  },
});
