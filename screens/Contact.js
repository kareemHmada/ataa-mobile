import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  I18nManager,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import api from "../api/api";

I18nManager.forceRTL(true);

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      Alert.alert("خطأ", "يرجى تعبئة جميع الحقول");
      return;
    }

    try {
      const res = await api.post("/contact", {
        name,
        email,
        subject,
        message,
      });

      Alert.alert("تم الإرسال", "تم إرسال رسالتك بنجاح");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error("Contact error:", error.response?.data || error.message);
      Alert.alert("فشل الإرسال", "حدث خطأ أثناء إرسال الرسالة");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <ScrollView>
        <Text style={styles.pageTitle}>Contact Us</Text>
        <Text style={styles.pageSubtitle}>
          We are here to answer your questions and assist you.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Contact Information</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "10%", marginLeft: 20 }}>
              <Icon name="map-marker" size={22} color="#2563eb" style={styles.infoIcon} />
              <Icon name="email-outline" size={22} color="#2563eb" style={styles.infoIcon} />
              <Icon name="phone" size={22} color="#2563eb" style={styles.infoIcon} />
            </View>
            <View style={{ width: "33%" }}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoLabel}>Phone</Text>
            </View>
            <View style={{ width: "33%" }}>
              <Text style={styles.infoText}>Egypt</Text>
              <Text style={styles.infoText}>info@ataa.org</Text>
              <Text style={styles.infoText}>01 XX XXX XXXX</Text>
            </View>
          </View>

          <Text style={[styles.infoLabel, { textAlign: "center" }]}>Follow on</Text>
          <View style={styles.socialRow}>
            <View style={{ flexDirection: "row-reverse" }}>
              <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com")}>
                <Icon name="facebook" size={24} color="#222" style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com")}>
                <Icon name="twitter" size={24} color="#222" style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com")}>
                <Icon name="instagram" size={24} color="#222" style={styles.socialIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.formBox}>
          <Text style={styles.formTitle}>Message</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Message title"
            value={subject}
            onChangeText={setSubject}
          />
          <TextInput
            style={[styles.input, { height: 80, textAlignVertical: "top" }]}
            placeholder="The message"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
            <Text style={styles.sendButtonText}>Send message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },
  pageTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 8,
  },
  pageSubtitle: {
    textAlign: "center",
    fontSize: 15,
    color: "#555",
    marginBottom: 25,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
  },
  infoIcon: { marginTop: 10 },
  infoLabel: { fontWeight: "bold", fontSize: 13, marginTop: 13 },
  infoText: { color: "#444", fontSize: 13, marginTop: 13 },
  socialRow: { marginTop: 8, alignItems: "center" },
  socialIcon: { marginLeft: 18 },
  formBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 2,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sendButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
