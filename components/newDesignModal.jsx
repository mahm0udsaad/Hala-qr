import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function CreateNewDesignModal({ visible, onClose }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <LinearGradient
          colors={["rgba(235, 200, 148, 0.8)", "rgba(180, 158, 244, 0.8)"]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                width: "80%",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}
              >
                Create New Design
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={onClose}
                >
                  <View
                    style={{
                      backgroundColor: "#003b95",
                      padding: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Ionicons name="pencil" size={30} color="#FFCC45" />
                  </View>
                  <Text style={{ marginTop: 20 }}>Whiteboard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={onClose}
                >
                  <View
                    style={{
                      backgroundColor: "#003b95",
                      padding: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Ionicons name="grid" size={30} color="#FFCC45" />
                  </View>
                  <Text style={{ marginTop: 20 }}>Explore Templates</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
