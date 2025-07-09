import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import api from "../../api/api";

const { width } = Dimensions.get("window");

// 🔵 Detail Row Component
const DetailRow = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <View style={styles.detailRow}>
      {/* Icon + Label */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
        <Icon name={icon} size={20} color="#2563eb" style={{ marginRight: 8 }} />
        <Text style={styles.detailLabel}>{label}</Text>
      </View>

      {/* Value */}
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

export default function DonationDetailsCard({ data }) {
  const placeholderImage = "https://via.placeholder.com/300x200.png?text=No+Image";

  const imageUri = data?.image
    ? `${api.defaults.baseURL}/storage/${data.image}`
    : placeholderImage;

  return (
    <View style={styles.bgWrapper}>
      <View style={styles.card}>
        {/* Title */}
        <Text style={styles.mainTitle}>Donation Details</Text>

        {/* Image */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: imageUri }} style={styles.productImage} />
        </View>

        {/* Main Title */}
        <Text style={styles.title}>{data?.title || "Donation Item"}</Text>

        {/* Details */}
        <View style={styles.detailsContainer}>
          <DetailRow
            icon="text"
            label="Description"
            value={data?.description || "No Description"}
          />
          <DetailRow
            icon="shape-outline"
            label="Category"
            value={data?.category}
          />
          <DetailRow
            icon="check-circle-outline"
            label="Status"
            value={data?.status}
          />
          <DetailRow
            icon="calendar"
            label="Date"
            value={data?.date}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
    minHeight: "100%",
    paddingVertical: 40,
  },
  card: {
    width: width * 0.92,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 26,
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#e0e7ef",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#22223b",
  },
  imageWrapper: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    padding: 8,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#2563eb",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  productImage: {
    width: 180,
    height: 180,
    borderRadius: 14,
    resizeMode: "cover",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#22223b",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  detailsContainer: {
    width: "100%",
    marginTop: 10,
  },
  detailRow: {
    marginBottom: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
    shadowColor: "#2563eb",
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  detailLabel: {
    fontWeight: "bold",
    color: "#22223b",
    fontSize: 16,
    marginRight: 4,
    marginLeft: 2,
  },
  detailValue: {
    color: "#444",
    fontSize: 16,
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
    textAlign: "left",
    marginLeft: 6,
    lineHeight: 22,
  },
});
