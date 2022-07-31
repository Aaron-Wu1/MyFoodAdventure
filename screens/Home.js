import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import SvgUri from "expo-svg-uri";
import EntriesManager from "../components/EntriesManager";
import AddEntry from "../components/AddEntry";
import EditEntry from "../components/EditEntry";
import { useState } from "react";

// View -> UIView
export default function Home() {
  const [loaded] = useFonts({
    NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
  });
  const [showAddEntry, setShowAddEntry] = useState(false);

  if (!loaded) {
    return null;
  }

  // // Add entry
  // const addEntry = (entry) => {
  //   const id = Math.floor(Math.random() * 10000) + 1;
  //   const newEntry = { id, ...entry };
  //   setEntries([...entries, newEntry]);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titlebar}>
        <Text style={styles.title}>My Food Adventure</Text>
      </View>
      <ScrollView style={styles.entryWrapper}>
        <EntriesManager />
        {/* {entries.length > 0 ? (
          <EntriesManager entries={entries} />
        ) : (
          "No Entries To Show"
        )} */}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={showAddEntry}
        visible={showAddEntry}
        onRequestClose={() => this.handleDismiss}
      >
        <View style={styles.addEntryPopup}>
          <View style={styles.footer}>
            <AddEntry
              showAddEntry={showAddEntry}
              setShowAddEntry={setShowAddEntry}
              //onAdd={addEntry}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.btmBar}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setShowAddEntry(!showAddEntry)}
        >
          <SvgUri
            style={styles.plus}
            width="46"
            height="46"
            source={{
              uri: "https://icongr.am/clarity/add.svg?size=42&color=000000",
            }}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDE9",
  },
  titlebar: {
    width: "100%",
    backgroundColor: "#FFF",
  },
  title: {
    fontFamily: "NunitoBold",
    fontSize: 24,
    textAlign: "center",
  },
  entryWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  btmBar: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EDEDE9",
  },
  addBtn: {
    width: 65,
    height: 65,
    paddingHorizontal: 10,
    paddingVertical: 10,
    top: -25,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
  },
  plus: {},
  addEntryPopup: {
    height: "90%",
    marginTop: "auto",
    backgroundColor: "#fff",
    borderRadius: 15,
    backgroundColor: "#EDEDE9",
  },
  saveBtn: {
    position: "flex",
    padding: 10,
    alignself: "flex-end",
  },
  xBtn: {
    position: "absolute",
    padding: 10,
    alignSelf: "flex-start",
  },
  x: {
    alignItems: "center",
  },
});
