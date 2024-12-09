import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Button,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const contactsData = [
  {
    id: 1,
    name: "Mohammed Salem",
    phone: "+91 9562830162",
    avatar: "AL",
    section: "A",
  },
  {
    id: 2,
    name: "Mohamed",
    phone: "+91 8432156795",
    avatar: "AJ",
    section: "A",
  },
  {
    id: 3,
    name: "Mohammed Salem",
    phone: "+91 9245631872",
    avatar: "AD",
    section: "A",
  },
  {
    id: 4,
    name: "Mohammed Salem",
    phone: "+91 7695236501",
    avatar: "BM",
    section: "B",
  },
  {
    id: 5,
    name: "Mohammed Salem",
    phone: "+91 8701593248",
    avatar: "CJ",
    section: "C",
  },
  {
    id: 6,
    name: "Colin Dsouza",
    phone: "+91 9015763240",
    avatar: "CD",
    section: "C",
  },
  {
    id: 7,
    name: "Perry Dsouza",
    phone: "+91 8777980016",
    avatar: "PD",
    section: "P",
  },
  {
    id: 8,
    name: "Riley Jose",
    phone: "+91 9974511230",
    avatar: "RJ",
    section: "R",
  },
];

const AddGuestsScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedGuests, setSelectedGuests] = useState([]);

  const handleSelect = (id) => {
    setSelectedGuests((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((guestId) => guestId !== id)
        : [...prevSelected, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedGuests.length === filteredContacts.length) {
      setSelectedGuests([]);
    } else {
      setSelectedGuests(filteredContacts.map((contact) => contact.id));
    }
  };

  const filteredContacts = contactsData.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Contacts List */}
      <ScrollView>
        {["A", "B", "C", "P", "R"].map((section) => (
          <View key={section} style={styles.sectionContainer}>
            <Text style={styles.sectionText}>{section}</Text>
            {filteredContacts
              .filter((contact) => contact.section === section)
              .map((contact) => (
                <Pressable
                  key={contact.id}
                  onPress={() => handleSelect(contact.id)}
                  style={({ pressed }) => [
                    styles.contactPressable,
                    {
                      backgroundColor: pressed ? "#E5E5EA" : "white",
                    },
                  ]}
                >
                  <View style={styles.contactContainer}>
                    <View style={styles.contactInfoContainer}>
                      <Avatar.Text
                        size={48}
                        label={contact.avatar}
                        style={styles.avatar}
                      />
                      <View>
                        <Text style={styles.contactName}>{contact.name}</Text>
                        <Text style={styles.contactPhone}>{contact.phone}</Text>
                      </View>
                    </View>
                    <Icon
                      name={
                        selectedGuests.includes(contact.id)
                          ? "checkmark-circle"
                          : "ellipse-outline"
                      }
                      size={24}
                      color={
                        selectedGuests.includes(contact.id) ? "green" : "gray"
                      }
                    />
                  </View>
                </Pressable>
              ))}
          </View>
        ))}
      </ScrollView>

      {/* Select All Button */}
      <View style={styles.selectAllContainer}>
        <Button title="Select All" onPress={handleSelectAll} color="#003b95" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBarContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  sectionContainer: {
    paddingHorizontal: 16,
  },
  sectionText: {
    color: "#6B7280",
    fontWeight: "bold",
    paddingVertical: 8,
  },
  contactPressable: {
    // Manages pressed state
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  contactInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    backgroundColor: "#D1D5DB",
  },
  contactName: {
    fontWeight: "600",
  },
  contactPhone: {
    color: "#6B7280",
  },
  selectAllContainer: {
    padding: 16,
  },
});

export default AddGuestsScreen;
