import { StyleSheet, Text, View, TextInput } from "react-native";

export default function InpotFildSet({title ,}) {
  return (
    <>
      <View style={{marginBottom:15,}}>
        <Text style={styles.label}>الاسم الكامل</Text>
        <TextInput
          style={styles.input}
          value={data.profile.fullName}
          onChangeText={(text) => handleProfileUpdate("fullName", text)}
        />
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
})