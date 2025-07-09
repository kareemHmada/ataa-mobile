import { View, Text, Pressable, StyleSheet } from "react-native";

export default function MedicalReportCard({
  title,
  date,
  status,
  imageUrl,
  onPressDetails,
  onAcceptance,
  but1,
  but2,
  onCancel,
  but3
}) {
  const getStatusColor = () => {
    switch (status) {
      case "Complete":
        return { backgroundColor: "#E8F5E9", color: "#2E7D32" };
      case "Received":
        return { backgroundColor: "#FFF3E0", color: "#EF6C00" };
      case "Pending":
        return { backgroundColor: "#E3F2FD", color: "#1565C0" };
      case "Approved":
          return { backgroundColor: "#E8F5E9", color: "#2E7D32" };
      default:
        return { backgroundColor: "#F5F5F5", color: "#424242" };
    }
  };
  const statusStyle = getStatusColor();



  const getStatusBut2 = () => {
    switch (but3) {
      case false:
        return {width: '100%',};
      default:
        return {width: '48%',};
    }
  };
  const statusButStyle2 = getStatusBut2();
  const getStatusBut3 = () => {
    switch (but2) {
      case false:
        return {width: '100%',};
      default:
        return {width: '48%',};
    }
  };
  const statusButStyle3 = getStatusBut3();

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.reportTitle}>{title}</Text>
        {imageUrl && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </View>
        )}
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.reportDate}>{date}</Text>
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

      {but1 === true && (
        <Pressable style={styles.detailsButton} onPress={onPressDetails}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </Pressable>
      )}

      {(status === "Received" || status === "Pending" ) && (
        
        <View style={styles.buttonContainer}>
        { but2 === true && (<Pressable style={[styles.cancelButton , {backgroundColor:'#2196f3' , width: statusButStyle2.width,}]} onPress={onAcceptance} >
        <Text style={styles.detailsButtonText}>Acceptance</Text>
      </Pressable>)}
        { but3 === true && (<Pressable style={[styles.cancelButton ,{width: statusButStyle3.width,}]}  onPress={onCancel}>
        <Text style={styles.detailsButtonText}>Cancel</Text>
      </Pressable>)}
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
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
  cancelButton: {
    backgroundColor: "#dc3545",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
    width: "48%",
  },
  buttonContainer:{
    flexDirection:"row",
    justifyContent:"space-around",
    
  }
});
