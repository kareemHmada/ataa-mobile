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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { orgData, updateOrgData } from "../../data/item-data";

export default function SettingsN() {
  const [data, setData] = useState(orgData);
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
    updateOrgData(updatedData);
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
    updateOrgData(updatedData);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Error", "New passwords don't match");
      return;
    }
    alert("Success", "Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "cancel", style: "cancel" },
        {
          text: "logout",
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
          <Text style={styles.sectionTitle}>Organization Information</Text>

          <View style={styles.item}>
            <Text style={styles.label}>Organization Name</Text>
            <TextInput
              style={styles.input}
              value={data.profile.orgName}
              onChangeText={(text) => handleProfileUpdate("orgName", text)}
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

          <View style={styles.item}>
            <Text style={styles.label}>Website</Text>
            <TextInput
              style={styles.input}
              value={data.profile.website}
              onChangeText={(text) => handleProfileUpdate("website", text)}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={data.profile.address}
              onChangeText={(text) => handleProfileUpdate("address", text)}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={data.profile.description}
              onChangeText={(text) => handleProfileUpdate("description", text)}
              multiline
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>

          <View style={styles.switchItem}>
            <Text style={styles.label}>Email Notifications</Text>
            <Switch
              value={data.notifications.email}
              onValueChange={() => handleToggle("notifications", "email")}
            />
          </View>

          <View style={styles.switchItem}>
            <Text style={styles.label}>New Requests Notifications</Text>
            <Switch
              value={data.notifications.newRequests}
              onValueChange={() => handleToggle("notifications", "newRequests")}
            />
          </View>

          <View style={styles.switchItem}>
            <Text style={styles.label}>New Messages Notifications</Text>
            <Switch
              value={data.notifications.newMessages}
              onValueChange={() => handleToggle("notifications", "newMessages")}
            />
          </View>

          <View style={styles.switchItem}>
            <Text style={styles.label}>Request Updates Notifications</Text>
            <Switch
              value={data.notifications.requestUpdates}
              onValueChange={() =>
                handleToggle("notifications", "requestUpdates")
              }
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

        {/*Logout  */}
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
