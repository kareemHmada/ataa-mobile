import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import api from "../../api/api";

const { width } = Dimensions.get("window");

// ✅ Condition Badge - الحالات: New, Like New, Good, Acceptable
const ConditionBadge = ({ condition = "Unknown" }) => {
  const getColor = () => {
    switch (condition.toLowerCase()) {
      case "new":
        return ["#4ade80", "#22d3ee"]; // أخضر / سماوي
      case "like new":
        return ["#60a5fa", "#38bdf8"]; // أزرق فاتح
      case "good":
        return ["#fbbf24", "#f59e42"]; // أصفر / برتقالي
      case "acceptable":
        return ["#a78bfa", "#818cf8"]; // بنفسجي
      default:
        return ["#a1a1aa", "#6b7280"]; // رمادي
    }
  };
  const [start, end] = getColor();
  return (
    <View style={[styles.conditionBadge, { backgroundColor: start, borderColor: end }]}>
      <Icon
        name={
          condition.toLowerCase() === "new"
            ? "star-circle-outline"
            : condition.toLowerCase() === "like new"
            ? "star-outline"
            : condition.toLowerCase() === "good"
            ? "emoticon-happy-outline"
            : condition.toLowerCase() === "acceptable"
            ? "emoticon-neutral-outline"
            : "help-circle-outline"
        }
        size={18}
        color="#fff"
        style={{ marginRight: 6 }}
      />
      <Text style={styles.conditionText}>
        {condition.charAt(0).toUpperCase() + condition.slice(1)}
      </Text>
    </View>
  );
};

// ✅ Detail Row - يتحمل نصوص طويلة
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

export default function DonationRequestCard({ item }) {
  const placeholderImage =
    "https://via.placeholder.com/300x200.png?text=No+Image";

  const imageUri =
    item?.images && item.images.length > 0
      ? `${api.defaults.baseURL}/storage/${item.images[0]}`
      : placeholderImage;

  return (
    <View style={styles.bgWrapper}>
      <View style={styles.card}>
      <Text style={styles.title}>Donation Details</Text>
        {/* Image */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: imageUri }} style={styles.productImage} />
        </View>

        {/* Title */}
        <Text style={styles.title}>{item?.type || "Donation Request"}</Text>

        {/* Condition Badge */}
        <ConditionBadge condition={item?.condition || "Unknown"} />

        {/* Details */}
        <View style={styles.detailsContainer}>
          <DetailRow
            icon="text"
            label="Description"
            value={item?.description || "No Description"}
          />
          <DetailRow icon="check-circle-outline" label="Status" value={item?.status} />
          <DetailRow icon="map-marker" label="Location" value={item?.location} />
          <DetailRow icon="note-text-outline" label="Notes" value={item?.notes} />
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
    backgroundColor: "#fff",
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
  conditionBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 22,
    marginBottom: 18,
    marginTop: 2,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 2,
    elevation: 1,
  },
  conditionText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textTransform: "capitalize",
    letterSpacing: 0.2,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  }
});
