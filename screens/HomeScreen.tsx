import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Icon import

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Icon
        name="home-outline" // Home ka icon
        size={40}
        color="#000"
        style={{ marginBottom: 10 }}
      />
      <Text style={{ fontSize: 18, fontWeight: "600", color: "#000" }}>
        Home Screen
      </Text>
    </View>
  );
};

export default HomeScreen;
