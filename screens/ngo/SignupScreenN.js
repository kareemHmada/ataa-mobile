import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api/api";
import BackBtu from "../../components/ui/BackBut";
import ButSo from "../../components/ui/ButSo";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function SignupScreenN() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [institution, setInstitution] = useState("");
  const [license, setLicense] = useState("");

  const handleSubmit = async () => {
    if (
      !name || !email || !password || !passwordConfirm || !institution || !license
    ) {
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
        role: "org",
        institution_name: institution,
        license_number: license,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ paddingTop: height * 0.02, marginTop: 36 }}>
        <BackBtu screen={"LoginScreen"} />
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
          <Text style={styles.header}>SIGN UP</Text>

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
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />

            <View style={styles.rowInputs}>
              <TextInput
                style={styles.inputHalf}
                placeholder="Institution name"
                value={institution}
                onChangeText={setInstitution}
              />
              <TextInput
                style={styles.inputHalf}
                placeholder="License number"
                keyboardType="number-pad"
                value={license}
                onChangeText={setLicense}
              />
            </View>

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>SIGN UP</Text>
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
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputHalf: {
    height: height * 0.065,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.015,
    fontSize: width * 0.04,
    width: "48%",
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
  orText: {
    textAlign: "center",
    color: "#666",
    marginVertical: height * 0.02,
  },
  butSo: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
