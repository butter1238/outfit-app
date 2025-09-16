import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // icon import

const ExploreScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Icon name="compass-outline" size={40} color="#000" style={{ marginBottom: 10 }} />
      <Text style={{ fontSize: 18, fontWeight: "600", color: "#000" }}>
        Explore Screen
      </Text>
    </View>
  );
};

export default ExploreScreen;
