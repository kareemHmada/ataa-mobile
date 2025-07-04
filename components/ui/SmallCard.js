import { View, Text, StyleSheet } from "react-native";
import IconFont from "../icon/IconFont";

export default function SmallCard({ titl, value, icon, size, color,StyleCard }) {
  return (
    <>

      <View style={[styles.card,StyleCard]}>
          <Text style={styles.cardTitle}>{titl}</Text>
        <View style={{ flexDirection: "row"  , justifyContent: "space-between"}}>
        <Text style={styles.cardValue}>{value}</Text>
          <IconFont icon={icon} color={color} size={size} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
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
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
