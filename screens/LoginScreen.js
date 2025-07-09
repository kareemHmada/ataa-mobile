import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../api/api";
import ButSo from "../components/ui/ButSo";
import BackBtu from "../components/ui/BackBut";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/api/auth/login", { email, password });

      const token = res.data.token;
      const user = res.data.user;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      await new Promise(resolve => setTimeout(resolve, 100));

      if (user.role === "org") {
        navigation.navigate("DrawerNavigationN");
      } else if (user.role === "donor") {
        navigation.navigate("DrawerNavigationU");
      } else if (user.role === "admin") {
        navigation.navigate("AdminAccounts");
      } else {
        navigation.navigate("BottomTabs");
      }

      Alert.alert("Logged In", "You are now logged in!");
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Error", "Invalid email or password");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.topBar}>
        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate("AccountTypeScreen")}
        >
          <Text style={styles.loginButtonText}>Create Account</Text>
        </Pressable>
        <BackBtu screen={"BottomTabs"} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>LOG IN</Text>

          <View style={styles.formContainer}>
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
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />

            <Pressable style={styles.submitButton} onPress={handleLogin}>
              <Text style={styles.submitButtonText}>LOG IN</Text>
            </Pressable>

            <Pressable>
              <Text style={styles.forgotPassword}>Forgot the password?</Text>
            </Pressable>
          </View>

          <Text style={styles.orText}>or continue with</Text>

          <View style={styles.butSo}>
            <ButSo icon={"facebook"} color={"#1877F2"} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingTop: height * 0.02,
    marginTop: 36,
    // paddingHorizontal: width * 0.05,
    backgroundColor: "#fff",
  },
  loginButton: {
    paddingTop: 2,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  loginButtonText: {
    color: "#5daeff",
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.05,
  },
  header: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.03,
  },
  formContainer: {
    marginBottom: height * 0.03,
  },
  input: {
    height: height * 0.065,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.015,
    fontSize: width * 0.04,
  },
  submitButton: {
    backgroundColor: "#2356D5",
    height: height * 0.065,
    borderRadius: width * 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  forgotPassword: {
    color: "#5daeff",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: height * 0.015,
  },
  orText: {
    textAlign: "center",
    marginVertical: height * 0.02,
    color: "#666",
  },
  butSo: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
