import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function ReceviedCard({imageUrl,description , type , quantity,location}) {
  
  let status = "Waiting";

  const getStatusColor = () => {
    switch (status) {
      case "Complete":
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
    <>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          {imageUrl && (
            <View style={styles.imageContainer}>
              <Image
              source={{ uri: imageUrl }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            </View>
          )}
          <Text style={styles.reportTitle}>{type} {quantity}</Text>
          <Text style={styles.reportDate}>{location}</Text>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.reportDate}>{description}</Text>
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
        </View>

        <Pressable style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </Pressable>
        <View style={{flexDirection:"row" , justifyContent: "space-around"}} >
          <Pressable style={[styles.detailsButton  , {backgroundColor : '#dc3545', width: '49%' , marginTop:10}]}>
            <Text style={styles.detailsButtonText}>Cancel</Text>
          </Pressable>
          <Pressable style={[styles.detailsButton  , {backgroundColor : '#2356D5' , width: '48%',marginTop:10}]}>
            <Text style={styles.detailsButtonText}>Acceptance</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  imageContainer: {
    height: 150,
    width: "100%",
  },
  cardImage: {
    height: "100%",
    width: "100%",
  },
  cardContent: {
    marginBottom: 12,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
    textAlign: "right",
  },
  reportDate: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
    textAlign: "right",
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
  detailsButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
