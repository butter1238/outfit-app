import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ItemCard({ item }: any) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    margin: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#222",
  },
  category: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});
