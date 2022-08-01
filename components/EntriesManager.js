import Entry from "./Entry";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
//tasks passed in as a prop for the tasks component
//the prop, task, is maped to a header with key as the task id as well was the task text
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const EntriesManager = () => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "restaurants"), orderBy("created"));
    onSnapshot(q, (querySnapshot) => {
      setEntries(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <>
      {entries.map((entry) => (
        <Entry id={entry.id} entry={entry.data} />
      ))}
    </>
  );
};

export default EntriesManager;
