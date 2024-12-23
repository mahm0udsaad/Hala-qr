import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  ChevronRight,
  Square,
  Circle,
  Triangle,
  Pentagon,
  Hexagon,
  Star,
  Heart,
  Diamond,
  Octagon,
} from "lucide-react-native";

const ShapeSelectionModal = ({
  visible,
  onClose,
  selectedShapeType,
  onSelectShape,
  onAddShape,
}) => {
  const shapes = [
    { type: "square", Icon: Square },
    { type: "circle", Icon: Circle },
    { type: "triangle", Icon: Triangle },
    { type: "pentagon", Icon: Pentagon },
    { type: "hexagon", Icon: Hexagon },
    { type: "star", Icon: Star },
    { type: "heart", Icon: Heart },
    { type: "diamond", Icon: Diamond },
    { type: "octagon", Icon: Octagon },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.shapeModal}>
          <Text style={styles.backgroundColorTitle}>Select Shape</Text>

          <View style={styles.scrollContainer}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.shapeContainer}
              showsHorizontalScrollIndicator={false}
            >
              {shapes.map(({ type, Icon }) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.shapeButton,
                    selectedShapeType === type && styles.selectedShape,
                  ]}
                  onPress={() => onSelectShape(type)}
                >
                  <Icon size={48} color="#1E3A8A" fill="#1E3A8A" />
                  <Text style={styles.shapeText}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.scrollIndicator}>
              <ChevronRight size={24} color="#1E3A8A" />
            </View>
          </View>

          <View style={styles.editModalButtons}>
            <TouchableOpacity style={styles.editModalCancel} onPress={onClose}>
              <Text style={styles.editModalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editModalDone}
              onPress={onAddShape}
              disabled={!selectedShapeType}
            >
              <Text style={styles.editModalButtonText}>Add Shape</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  shapeModal: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContainer: {
    position: "relative",
  },
  scrollIndicator: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -12 }],
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    padding: 4,
  },
  editModalButtons: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editModalCancel: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    alignItems: "center",
  },
  editModalDone: {
    flex: 1,
    padding: 12,
    backgroundColor: "#1E3A8A",
    borderRadius: 8,
    alignItems: "center",
  },
  editModalButtonText: {
    color: "white",
    fontWeight: "600",
  },
  backgroundColorTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  shapeContainer: {
    flexDirection: "row",
    paddingRight: 40,
    gap: 16,
    marginBottom: 20,
  },
  shapeButton: {
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: 100,
  },
  selectedShape: {
    borderColor: "#1E3A8A",
    backgroundColor: "rgba(30, 58, 138, 0.1)",
  },
  shapeText: {
    marginTop: 8,
    color: "#1E3A8A",
    fontSize: 12,
  },
});

export default ShapeSelectionModal;
