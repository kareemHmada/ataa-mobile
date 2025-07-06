import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
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

export default function NewDonationU({ navigation }) {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    imageUrl: "",
    status: "Waiting",
    description: "",
    category: "",
    location: "",
    type: "",
    quantity: "",
    condition: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setTempImage(result.assets[0].uri);
      setFormData({ ...formData, imageUrl: result.assets[0].uri });
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setFormData({ ...formData, date: formattedDate });
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("date", formData.date);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("status", formData.status);
      form.append("location", formData.location || "");
      form.append("type", formData.type);
      form.append("quantity", formData.quantity);
      form.append("condition", formData.condition);
      form.append("image", formData.imageUrl);

      if (tempImage) {
        const filename = tempImage.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        form.append("img", {
          uri: tempImage,
          name: filename,
          type,
        });
      }

      await api.post("/api/auth/donations", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Success", "Donation added successfully");
      navigation.goBack();
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong. Try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>New Donation</Text>

      <Text style={styles.sectionHeader}>Device Information</Text>

      <Text style={styles.label}>Device Title*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter device name"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
      />
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

      <Text style={styles.label}>Date</Text>
      <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{formData.date}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={new Date(formData.date)}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Category*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter category"
        value={formData.category}
        onChangeText={(text) => setFormData({ ...formData, category: text })}
      />

      <Text style={styles.label}>Description*</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Enter detailed description"
        value={formData.description}
        onChangeText={(text) =>
          setFormData({ ...formData, description: text })
        }
        multiline
        numberOfLines={4}
      />

      <Text style={styles.sectionHeader}>Donation Information</Text>

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={formData.location}
        onChangeText={(text) => setFormData({ ...formData, location: text })}
      />

      <Text style={styles.sectionHeader}>Device Images</Text>
      <Pressable style={styles.imageUploadButton} onPress={pickImage}>
        {tempImage ? (
          <Image source={{ uri: tempImage }} style={styles.imagePreview} />
        ) : (
          <>
            <Text style={styles.imageUploadText}>+ Add Image</Text>
            <Text style={styles.imageHint}>PNG, JPG up to 2MB</Text>
          </>
        )}
      </Pressable>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={() => {
            setFormData({
              title: "",
              date: new Date().toISOString().split("T")[0],
              imageUrl: "",
              status: "Waiting",
              description: "",
              category: "",
              location: "",
            });
            setTempImage(null);
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Donate</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#2c3e50",
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    paddingBottom: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#7f8c8d",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  imageUploadButton: {
    height: 150,
    borderWidth: 1,
    borderColor: "#bdc3c7",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#ecf0f1",
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
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
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
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: "#27ae60",
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
  },
});
