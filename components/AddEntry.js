import { setStatusBarBackgroundColor } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import SvgUri from "expo-svg-uri";

const AddEntry = ({ setShowAddEntry, showAddEntry, onAdd }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [restaurantName, setRestaurantName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera, please enable it in settings</Text>;
  }

  const AddEntry = () => {
    if (!restaurantName) {
      alert("Please add a restaurant name");
      return;
    }
    onAdd({ restaurantName, rating, review });

    setRestaurantName("");
    setReview("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "IOS" ? "padding" : "height"}
      style={styles.AddEntryWrapper}
    >
      <TouchableOpacity style={styles.saveBtn}>
        <Text
          style={{ fontSize: "18", color: "blue", textAlign: "right" }}
          onPress={() => {
            setShowAddEntry(!showAddEntry);
            AddEntry();
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.xBtn}
        onPress={() => {
          setShowAddEntry(!showAddEntry);
        }}
      >
        <SvgUri
          style={styles.x}
          width="26"
          height="26"
          source={{
            uri: "https://icongr.am/clarity/close.svg?size=128&color=000000",
          }}
        />
      </TouchableOpacity>
      <View style={styles.cameraWrapper}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      <TextInput
        style={styles.entryNameInput}
        placeholder={"Restaurant name"}
        onChangeText={(restaurantName) => setRestaurantName(restaurantName)}
      />
      <TextInput
        style={styles.ratingEntryInput}
        placeholder={"Rating"}
        onChangeText={(rating) => setRating(rating)}
      />
      <TextInput
        style={styles.reviewEntryInput}
        placeholder={"Review"}
        onChangeText={(review) => setReview(review)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  AddEntryWrapper: {
    postion: "absolute",
    padding: 20,
  },
  cameraWrapper: {
    borderRadius: 15,
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  camera: {
    borderRadius: 15,
    width: 300,
    height: 300,
    alignSelf: "center",
    padding: 8,
  },
  entryNameInput: {
    top: 20,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  ratingEntryInput: {
    borderRadius: 15,
    padding: 10,
    top: 30,
    backgroundColor: "#fff",
  },
  reviewEntryInput: {
    borderRadius: 15,
    padding: 10,
    top: 40,
    backgroundColor: "#fff",
  },
});

export default AddEntry;
