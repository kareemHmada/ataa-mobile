import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import api from "../../api/api"; 

const requestTypes = [
  { label: "Select donation type", value: "" },
  { label: "Clothes", value: "Clothes" },
  { label: "Furniture", value: "Furniture" },
  { label: "Electronics", value: "Electronics" },
  { label: "Books", value: "Books" },
  { label: "Toys", value: "Toys" },
  { label: "Other", value: "Other" },
];

const conditions = [
  { label: "Select condition", value: "" },
  { label: "New", value: "New" },
  { label: "Like New", value: "Like New" },
  { label: "Good", value: "Good" },
  { label: "Acceptable", value: "Acceptable" },
];

export default function NewRequestN({ navigation }) {
  const [formData, setFormData] = useState({
    type: "",
    quantity: "",
    condition: "",
    description: "",
    images: "",
    location: "",
    notes: "",
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({
        ...formData,
        images: result.assets[0].uri,
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.type || !formData.condition) {
      Alert.alert("Error", "Please select type and condition");
      return;
    }

    try {
      const form = new FormData();

      form.append("type", formData.type);
      form.append("quantity", formData.quantity || 1);
      form.append("condition", formData.condition);
      form.append("description", formData.description || "");
      form.append("location", formData.location || "");
      form.append("notes", formData.notes || "");

      form.append("image", formData.images);

      await api.post("/api/auth/donation-requests", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Donation request submitted successfully");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to submit donation request");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
      style={styles.container}
    >
      <ScrollView style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={styles.header}>New Donation Request</Text>

        <Text style={styles.sectionHeader}>Request Details</Text>

        <Text style={styles.label}>Donation Type*</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            {requestTypes.map((item) => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={formData.quantity}
          onChangeText={(text) => setFormData({ ...formData, quantity: text })}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Condition*</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.condition}
            onValueChange={(value) =>
              setFormData({ ...formData, condition: value })
            }
          >
            {conditions.map((item) => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          multiline
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
        />

        <Text style={styles.label}>Images</Text>
        <Pressable style={styles.imageUpload} onPress={pickImage}>
          <Text style={styles.imageUploadText}>+ Add Images</Text>
          <Text style={styles.imageHint}>PNG, JPG up to 10MB</Text>
          {formData.images && (
            <View style={styles.imagePreviewContainer}>
              <Image
                  source={{ uri: formData.images }}
                  style={styles.imagePreview}
                />
            </View>
          )}
        </Pressable>

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
        />

        <Text style={styles.label}>Additional Notes</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          multiline
          value={formData.notes}
          onChangeText={(text) => setFormData({ ...formData, notes: text })}
        />

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => {
              setFormData({
                type: "",
                quantity: "",
                condition: "",
                description: "",
                  images: "",
                location: "",
                notes: "",
              });
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
  },
  imageUpload: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  imageUploadText: {
    fontSize: 16,
    color: "#555",
  },
  imageHint: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  imagePreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 5,
    margin: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#27ae60",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
