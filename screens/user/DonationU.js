import { ScrollView, View, TextInput, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import MedicalEquipmentCard from "../../components/ui/MedicalEquipmentCard";
import api from "../../api/api";

export default function DonationU({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [donations, setDonations] = useState([]);

  const filteredItems = searchQuery
    ? donations.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : donations;

  useEffect(() => {
    const focusListener = navigation.addListener("focus", async () => {
      try {
        const res = await api.get("/api/auth/donations");
        setDonations(res.data);
      } catch (error) {
        console.log("Error loading donations:", error.response?.data || error.message);
      }
    });

    return focusListener;
  }, [navigation]);


  console.log(donations);
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search donations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredItems.map((item) => (
          <MedicalEquipmentCard
            key={item.id}
            title={item.title}
            category={item.category}
            status={item.status}
            description={item.description}
            imageUrl={item.img}
          />
          
        ))
        
        
      }    
        {/* <Image source={{uri:`http://localhost/ataa-api/storage/app/public/686a663725604.png`}} style={{width: 200, height: 200, alignSelf: 'center'}}/> */}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  searchContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
});


