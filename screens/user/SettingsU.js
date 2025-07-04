import { useState } from "react";
import {
  View,
  Text,
  Switch,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userData, updateUserData } from "../../data/item-data";

export default function SettingsU() {
  const [data, setData] = useState(userData);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const handleToggle = (section, field) => {
    const updatedData = {
      ...data,
      [section]: {
        ...data[section],
        [field]: !data[section][field],
      },
    };
    setData(updatedData);
    updateUserData(updatedData);
  };

  const handleProfileUpdate = (field, value) => {
    const updatedData = {
      ...data,
      profile: {
        ...data.profile,
        [field]: value,
      },
    };
    setData(updatedData);
    updateUserData(updatedData);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Error", "New passwords do not match");
      return;
    }
    alert("Success", "Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    Alert.alert(
      "تأكيد الخروج",
      "هل أنت متأكد أنك تريد تسجيل الخروج؟",
      [
        {
          text: "إلغاء",
          style: "cancel",
        },
        {
          text: "نعم، تسجيل الخروج",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");

            navigation.reset({
              index: 0,
              routes: [{ name: "LoginScreen" }],
            });
          },
        },
      ]
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>

          <View style={styles.item}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={data.profile.fullName}
              onChangeText={(text) => handleProfileUpdate("fullName", text)}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={data.profile.email}
              onChangeText={(text) => handleProfileUpdate("email", text)}
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.switchItem}>
            <Text style={styles.label}>Email Notifications</Text>
            <Switch
              value={data.notifications.email}
              onValueChange={() => handleToggle("notifications", "email")}
            />
          </View>

          <View style={styles.switchItem}>
            <Text style={styles.label}>Message Notifications</Text>
            <Switch
              value={data.notifications.messages}
              onValueChange={() => handleToggle("notifications", "messages")}
            />
          </View>

          <View style={styles.switchItem}>
            <Text style={styles.label}>Donation Notifications</Text>
            <Switch
              value={data.notifications.donations}
              onValueChange={() => handleToggle("notifications", "donations")}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change Password</Text>

          <View style={styles.item}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Text style={styles.button} onPress={handlePasswordChange}>
              Change Password
            </Text>
          </View>
        </View>

        {/* Logout*/}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.buttonContainer}>
            <Text
              style={[styles.button, { backgroundColor: "#d9534f" }]}
              onPress={handleLogout}
            >
              Logout
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  item: {
    marginBottom: 15,
  },
  switchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2356D5",
    color: "#fff",
    padding: 12,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
});
