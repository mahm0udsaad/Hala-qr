import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  SectionList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import * as Contacts from "expo-contacts";
import { Link, useLocalSearchParams } from "expo-router";
import { useStudio } from "../../../../../components/studio/context";

const Contact = memo(({ contact, isSelected, onSelect }) => (
  <Pressable
    onPress={() => onSelect(contact.id)}
    style={({ pressed }) => [
      styles.contactPressable,
      { backgroundColor: pressed ? "#E5E5EA" : "white" },
    ]}
  >
    <View style={styles.contactContainer}>
      <View style={styles.contactInfoContainer}>
        <Avatar.Text size={48} label={contact.avatar} style={styles.avatar} />
        <View>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactPhone}>{contact.phone}</Text>
        </View>
      </View>
      <Icon
        name={isSelected ? "checkmark-circle" : "ellipse-outline"}
        size={24}
        color={isSelected ? "green" : "gray"}
      />
    </View>
  </Pressable>
));

const AddGuestsScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedGuests, setSelectedGuests] = useState(new Set());
  const [deviceContacts, setDeviceContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addGuest, event } = useStudio();
  const params = useLocalSearchParams();

  // Initialize selected guests from existing event guests
  useEffect(() => {
    if (event?.guests) {
      const existingGuestIds = new Set(event.guests.map((guest) => guest.id));
      setSelectedGuests(existingGuestIds);
    }
  }, [event]);

  useEffect(() => {
    handleImportContacts();
  }, []);

  const handleImportContacts = async () => {
    try {
      setIsLoading(true);
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
        });

        if (data.length > 0) {
          const formattedContacts = data
            .filter(
              (contact) => contact.name && contact.phoneNumbers?.[0]?.number,
            )
            .map((contact) => ({
              id: contact.id,
              name: contact.name,
              phone: contact.phoneNumbers[0].number,
              avatar: contact.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2),
              section: contact.name[0].toUpperCase(),
              status: "waiting",
            }));

          setDeviceContacts(formattedContacts);
        }
      }
    } catch (error) {
      console.error("Error importing contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = useCallback((id) => {
    setSelectedGuests((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    const filteredContacts = deviceContacts.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (selectedGuests.size === filteredContacts.length) {
      setSelectedGuests(new Set());
    } else {
      setSelectedGuests(new Set(filteredContacts.map((contact) => contact.id)));
    }
  }, [deviceContacts, search, selectedGuests.size]);

  const handleSaveContacts = useCallback(() => {
    const selectedContacts = deviceContacts.filter((contact) =>
      selectedGuests.has(contact.id),
    );
    // Add each contact individually using addGuest
    selectedContacts.forEach((contact) => {
      addGuest(contact);
    });
  }, [deviceContacts, selectedGuests, addGuest]);

  // Memoized filtering for performance
  const filteredContacts = useMemo(
    () =>
      deviceContacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [deviceContacts, search],
  );

  // Prepare sections for SectionList for better performance
  const contactSections = useMemo(() => {
    const sections = {};
    filteredContacts.forEach((contact) => {
      const section = contact.section;
      if (!sections[section]) sections[section] = [];
      sections[section].push(contact);
    });

    return Object.keys(sections)
      .sort()
      .map((section) => ({
        title: section,
        data: sections[section],
      }));
  }, [filteredContacts]);

  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
      </View>
    );
  }

  if (deviceContacts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="people-outline" size={64} color="#6B7280" />
        <Text style={styles.emptyText}>No contacts imported yet</Text>
        <Pressable style={styles.importButton} onPress={handleImportContacts}>
          <Text style={styles.importButtonText}>Import Contacts</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <SectionList
        sections={contactSections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionText}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <Contact
            contact={item}
            isSelected={selectedGuests.has(item.id)}
            onSelect={handleSelect}
          />
        )}
        style={styles.contactsList}
      />

      <View style={styles.bottomContainer}>
        <Pressable style={styles.selectAllButton} onPress={handleSelectAll}>
          <Text style={styles.selectAllButtonText}>
            {selectedGuests.size === filteredContacts.length
              ? "Deselect All"
              : "Select All"}
          </Text>
        </Pressable>

        <Link
          href={{
            pathname: `/add/templates/[id]/event-preview`,
            params: { id: "new" },
          }}
          onPress={handleSaveContacts}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>
            Save & Continue ({selectedGuests.size})
          </Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "#6B7280",
    marginVertical: 16,
  },
  importButton: {
    backgroundColor: "#1E40AF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  importButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  searchBarContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  searchInput: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  contactsList: {
    flex: 1,
  },
  sectionContainer: {
    paddingHorizontal: 16,
  },
  sectionText: {
    color: "#6B7280",
    fontWeight: "bold",
    paddingVertical: 8,
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
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    flexDirection: "row",
    gap: 12,
  },
  selectAllButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  selectAllButtonText: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#1E40AF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default AddGuestsScreen;
