import { View, Image, StyleSheet } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function ButSo({icon, color}) {
  return (
    <>
      <View style={styles.contener}>
        <FontAwesome5 name={icon} size={24} color={color} />
      </View>
      <View style={styles.contener}>
        <Image source={require('../../assets/Google.png')} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contener: {
    borderColor : "#E5E8EC",
    borderWidth:1,
    width: 77,
    height: 52,
    borderRadius:20,
    justifyContent:"center" , 
    alignItems:"center",

  },
});
