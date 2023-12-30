import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View
      style={
        clicked
          ? styles.searchBar__clicked
          : styles.searchBar__unclicked
      }
    >
      {/* Input field */}
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchPhrase}
        onChangeText={setSearchPhrase}
        onFocus={() => {
          // setClicked(true);
        }}
      />
      {/* search Icon */}
      <Feather
        name="search"
        size={12}
        color="black"
        style={{ marginLeft: 1 }}
      />
      {/* cross Icon, depending on whether the search bar is clicked or not */}
      {/* {clicked && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
            setSearchPhrase("")
          }} />
        )} */}
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  searchBar__unclicked: {
    marginHorizontal: 14,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 36,
    paddingHorizontal: 16,
    backgroundColor: "#D9D9D9",
    borderRadius: 16,
  },
  searchBar__clicked: {
    marginHorizontal: 14,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    height: 36,
    paddingHorizontal: 16,
    backgroundColor: "#D9D9D9",
    borderRadius: 16,
  },
  input: {
    fontSize: 12,
  },
});