import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { EllipsisVertical, Edit2, Trash2 } from "lucide-react-native";

export const ControlButtons = ({
  onShowMore,
  onEdit,
  onDelete,
  scale,
  isText,
}) => {
  const inverseScale = 1 / scale;

  return (
    <Animated.View
      style={[
        styles.controlsContainer,
        {
          transform: [{ scale: inverseScale }],
        },
      ]}
    >
      <TouchableOpacity style={styles.controlButton} onPress={onShowMore}>
        <EllipsisVertical size={18} color="#1E3A8A" />
      </TouchableOpacity>
      <Text style={styles.separator}>|</Text>
      {isText && (
        <>
          <TouchableOpacity style={styles.controlButton} onPress={onEdit}>
            <Edit2 size={18} color="#1E3A8A" />
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
        </>
      )}
      <TouchableOpacity style={styles.controlButton} onPress={onDelete}>
        <Trash2 size={18} color="#FF0000" />
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: "row",
    position: "absolute",
    top: -40,
    right: -10,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  controlButton: {
    padding: 4,
  },
  separator: {
    marginHorizontal: 4,
    color: "#D1D5DB",
    fontSize: 20,
  },
});
