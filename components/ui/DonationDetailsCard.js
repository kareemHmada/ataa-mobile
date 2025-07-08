import { View, Text, Image, StyleSheet } from "react-native";
import api from "../../api/api";

export default function DonationDetailsCard({ data }) {
  const placeholderImage =
    "https://via.placeholder.com/300x200.png?text=No+Image";

  const imageUri = data?.image
    ? `${api.defaults.baseURL}/storage/${data.image}`
    : placeholderImage;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.text}>Description: {data.description || "No Description"}</Text>
      <Text style={styles.text}>Category: {data.category}</Text>
      <Text style={styles.text}>Status: {data.status}</Text>
      <Text style={styles.text}>Date: {data.date}</Text>
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
