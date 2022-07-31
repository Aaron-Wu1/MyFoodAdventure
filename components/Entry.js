import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import SvgUri from "expo-svg-uri";
import EditEntry from "./EditEntry";

const Entry = ({ entry }) => {
  const [showEditEntry, setShowEditEntry] = useState(false);

  return (
    <View style={styles.entry}>
      <Image
        style={{ width: 200, height: 200 }}
        //source={{ uri: entry.image }}
      />
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => setShowEditEntry(!showEditEntry)}
      >
        <SvgUri
          style={styles.pencil}
          source={{
            uri: "https://icongr.am/clarity/pencil.svg?size=16&color=currentColor",
          }}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={showEditEntry}
        visible={showEditEntry}
        onRequestClose={() => this.handleDismiss}
      >
        <EditEntry
          showEditEntry={showEditEntry}
          setShowEditEntry={setShowEditEntry}
        />
      </Modal>

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
