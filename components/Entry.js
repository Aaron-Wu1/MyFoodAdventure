import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Entry = ({ entry }) => {
  return (
    <View style={styles.entry}>
      <Image
        style={{ width: 200, height: 200 }}
        source={{ uri: entry.image }}
      />
      <Text style={styles.restaurantName}>
        Restaurant Name:{entry.restaurantName}
      </Text>
      <Text>ID: {entry.id}</Text>
      <Text>review: {entry.review}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  entry: {
    width: 335,
    height: 300,
    borderRadius: 15,
    backgroundColor: "#EDEDE9",
    justifySelf: "space-between",
    marginBottom: 20,
  },
});

export default Entry;
