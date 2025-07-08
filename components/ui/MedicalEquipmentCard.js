import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import api from "../../api/api"; // api.js



export default function MedicalEquipmentCard({
  title,
  category,
  status,
  description,
  onPressDetails,
  imageUrl,
  but1,but2
}) {
  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return { backgroundColor: "#E8F5E9", color: "#2E7D32" };
      case "Waiting":
        return { backgroundColor: "#FFF3E0", color: "#EF6C00" };
      case "Implementation":
        return { backgroundColor: "#E3F2FD", color: "#1565C0" };
      default:
        return { backgroundColor: "#F5F5F5", color: "#424242" };
    }
  };

  const statusStyle = getStatusColor();

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{title}</Text>

        <View
          style={[
            styles.statusContainer,
            { backgroundColor: statusStyle.backgroundColor },
          ]}
        >
          <Text style={[styles.statusText, { color: statusStyle.color }]}>
            {status}
          </Text>
        </View>
      </View>
      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${api.defaults.baseURL}/storage/${imageUrl}` }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>
      )}

      <View style={styles.cardBody}>
        <Text style={styles.category}>
          <Text style={{ fontWeight: "bold" }}>Category:</Text> {category}
        </Text>
      </View>

      <Text style={styles.description}>
        <Text style={{ fontWeight: "bold" }}>Description:</Text> {description}
      </Text>
{ ( but1 === true) && (      <Pressable style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>View Details</Text>
      </Pressable>)}

      {(status === "Waiting"||status === "Pending" || but2 === true ) && (
        <Pressable style={styles.cancelButton}>
          <Text style={styles.detailsButtonText}>Cancel</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: 10,
  },
  imageContainer: {
    height: "200",
    width: "100%",
  },
  cardImage: {
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  detailsButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  cardBody: {
    marginBottom: 10,
  },
  category: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  progress: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  statusContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: "#2E7D32",
    fontSize: 12,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    color: "#555555",
    marginTop: 5,
    paddingTop: 5,
  },
});
