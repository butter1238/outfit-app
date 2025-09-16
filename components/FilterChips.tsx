 
import { Pressable, Text, StyleSheet } from "react-native";

export default function FilterChip({ label, active, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.activeChip]}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#333",
  },
  activeChip: {
    backgroundColor: "#F5A623",
  },
  activeLabel: {
    color: "#fff",
    fontFamily: "Poppins_500Medium",
  },
});
