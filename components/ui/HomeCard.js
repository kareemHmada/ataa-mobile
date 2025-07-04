import { View, Text, StyleSheet } from "react-native";
import IconFont from "../icon/IconFont";

export default function HomeCard({ titl, value, icon, }) {
  return (
    <>
      <View style={styles.card}>
        <View >

            <Text style={styles.cardValue}>{value}</Text>
          <Text style={styles.cardTitle}>{titl}</Text>

        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,

  },
  cardTitle: {
    fontSize: 12,
    color: "#666",
    textAlign:"center"
  },
  cardValue: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign:"center"
  },
});
