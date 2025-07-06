import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api/api";
import BackBtu from "../../components/ui/BackBut";
import ButSo from "../../components/ui/ButSo";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SignupScreenU() {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const role = route.params?.role || "donor";

  const handleSubmit = async () => {
    if (!name || !email || !password || !passwordConfirm) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/api/auth/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
        role,
      });

      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

      Alert.alert("Success", "Account created successfully!");

      const userRole = res.data.user?.role;
      if (userRole === "org") {
        navigation.navigate("DrawerNavigationN");
      } else if (userRole === "donor" || userRole === "receiver") {
        navigation.navigate("DrawerNavigationU");
      } else {
        navigation.navigate("BottomTabs");
      }

    } catch (error) {
      console.log("Signup error:", error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong during signup.");
    }
  };

  return (
    <>
      <View style={{ paddingTop: 30, backgroundColor: "#fff" }}>
        <BackBtu screen={"LoginScreen"} />
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>SIGN UP</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={90}
        >
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="User name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>SIGN UP</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>

        <Text style={styles.orText}>or continue with</Text>

        <View style={styles.butSo}>
          <ButSo icon={"facebook"} color={"#1877F2"} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingBottom: 100,
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 30,
    textAlign: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#2356D5",
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#666",
  },
  butSo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
