import Entry from "./Entry";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
//tasks passed in as a prop for the tasks component
//the prop, task, is maped to a header with key as the task id as well was the task text
const Entries = ({ entries }) => {
  return (
    <>
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default Entries;
