import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackBtu from "../components/ui/BackBut";

export default function AccountTypeScreen() {
  const [selectedType, setSelectedType] = useState(null);
  const navigation = useNavigation();

  const accountTypes = [
    { id: 1, name: "Donor", role: "donor" },
    { id: 2, name: "Charity", role: "org" },
  ];

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (!selectedType) return;

    const { role } = selectedType;

    if (role === "org") {
      navigation.navigate("SignupScreenN", { role });
    } else {
      navigation.navigate("SignupScreenU", { role });
    }
  };

  return (
    <>
      <View style={{ paddingTop: 51, backgroundColor: "#fff" }}>
        <BackBtu screen={"LoginScreen"} />
      </View>
      <View style={styles.container}>
        <View style={styles.headerImageContainer}>
          <Image
            style={styles.headerImage}
            source={require("../assets/Ataa.png")}
          />
        </View>
        <Text style={styles.title}>Create a new account</Text>
        <Text style={styles.subtitle}>Account type</Text>
        <View style={styles.optionsContainer}>
          {accountTypes.map((type) => (
            <Pressable
              key={type.id}
              style={[
                styles.optionButton,
                selectedType?.id === type.id && styles.selectedOption,
              ]}
              onPress={() => handleSelectType(type)}
            >
              <Text style={styles.optionText}>{type.name}</Text>
            </Pressable>
          ))}
        </View>
        {selectedType && (
          <Pressable style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        )}
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  optionsContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedOption: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196f3",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#2196f3",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerImageContainer: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: "60%",
    height: "100%",
  },
});
