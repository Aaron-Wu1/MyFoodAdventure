import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { BackHandler } from "react-native";
import { Camera, CameraType } from "expo-camera";

const EditEntry = ({ setShowEditEntry, showEditEntry }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [restaurantName, setRestaurantName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const handleUpdate = async () => {
    const entryDocRef = doc(db, "entries", id);
    try {
      await updateDoc(taskDocRef, {
        restaurantName: restaurantName,
        rating: rating,
        review: review,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };
  const editEntry = () => {
    if (!restaurantName) {
      alert("Please add a restaurant name");
      return;
    }
    //onAdd({ restaurantName, rating, review });
    handleUpdate();
    //Create();

    setRestaurantName("");
    setReview("");
  };
  return (
    <div>
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
    </div>
  );
};

export default EditEntry;
