import { Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function BackBtu({ screen }) {
  const navigation = useNavigation();

  return (
    <>
      <Pressable
        style={{ flexDirection: "row"}}
        onPress={() => {
          navigation.navigate(screen);
        }}
      >
        <Ionicons name="chevron-back" size={25} color="black" />
        <Text style={{ paddingLeft: 5, fontSize: 19, fontWeight: "bold" , }}>
          Back
        </Text>
      </Pressable>
    </>
  );
}
