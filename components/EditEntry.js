import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SvgUri from "expo-svg-uri";
import { Camera, CameraType } from "expo-camera";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const EditEntry = ({ setShowEditEntry, showEditEntry, entry, id }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [restaurantName, setRestaurantName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const handleUpdate = async () => {
    const entryDocRef = doc(db, "restaurants", id);
    try {
      await updateDoc(entryDocRef, {
        restaurantName: restaurantName,
        rating: rating,
        review: review,
      });
    } catch (err) {
      alert(err);
    }
  };

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

  const editEntry = () => {
    if (!restaurantName) {
      alert("Please add a restaurant name");
      return;
    }
    handleUpdate();

    setRestaurantName("");
    setReview("");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "IOS" ? "padding" : "height"}
      style={styles.EditEntryWrapper}
    >
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
        //style={styles.entryNameInput}
        placeholder={"Restaurant name"}
        onChangeText={(restaurantName) => setRestaurantName(restaurantName)}
      />
      <TextInput
        //style={styles.ratingEntryInput}
        placeholder={"Rating"}
        onChangeText={(rating) => setRating(rating)}
      />
      <TextInput
        //style={styles.reviewEntryInput}
        placeholder={"Review"}
        onChangeText={(review) => setReview(review)}
      />
      <TouchableOpacity>
        <Text
          //style={{ fontSize: 18, color: "blue", textAlign: "right" }}
          onPress={() => {
            setShowEditEntry(!showEditEntry);
            editEntry();
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.xBtn}
        onPress={() => {
          setShowEditEntry(!showEditEntry);
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  EditEntryWrapper: {
    postion: "absolute",
    padding: 30,
    flex: 1,
    backgroundColor: "#fff",
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

export default EditEntry;
