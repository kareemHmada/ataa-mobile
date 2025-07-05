import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../api/api"; 
import ButSo from "../components/ui/ButSo";
import BackBtu from "../components/ui/BackBut";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const token = res.data.token;
      const user = res.data.user;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      
      if (user.role === "org") {
        navigation.navigate("DrawerNavigationN");
      } else if (user.role === "donor" || user.role === "receiver") {
        navigation.navigate("DrawerNavigationU");
      } else {
        navigation.navigate("BottomTabs");
      }

      Alert.alert("تم تسجيل الدخول");

    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("خطأ", "تأكد من البريد وكلمة المرور");
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          paddingTop: 50,
          backgroundColor: "#fff"
        }}
      >
        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate("AccountTypeScreen")}
        >
          <Text style={styles.loginButtonText}>Create Account</Text>
        </Pressable>
        <View style={{ backgroundColor: "#fff" }}>
          <BackBtu screen={"BottomTabs"} />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.header}>LOG IN</Text>

        <View style={styles.formContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
          >
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

            <Pressable style={styles.submitButton} onPress={handleLogin}>
              <Text style={styles.submitButtonText}>LOG IN</Text>
            </Pressable>
          </KeyboardAvoidingView>

          <Pressable>
            <Text style={styles.forgotPassword}>Forgot the password?</Text>
          </Pressable>
        </View>

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
    paddingBottom: 180,
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 30,
    textAlign: "center",
    paddingTop: 50,
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
  forgotPassword: {
    color: "#5daeff",
    textAlign: "center",
    textDecorationLine: "underline",
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
