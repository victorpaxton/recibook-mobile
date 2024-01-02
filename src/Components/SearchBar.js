import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

const SearchBar = ({ handleSummit }) => {
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  return (
    <View style={styles.searchBar}>
      {/* Input field */}
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchPhrase}
        onChangeText={setSearchPhrase}
        onFocus={() => {
          setClicked(true);
        }}
        onSubmitEditing={handleSummit}
      />
      {/* search Icon */}
      {!clicked && (
        <Feather
          name="search"
          size={18}
          color="#595959"
          style={{ marginLeft: 1 }}
        />
      )}
      {/* cross Icon, depending on whether the search bar is clicked or not */}
      {clicked && (
        <Entypo
          name="cross"
          size={18}
          color="#595959"
          style={{ padding: 1 }}
          onPress={() => {
            Keyboard.dismiss();
            setSearchPhrase('');
            setClicked(false);
          }}
        />
      )}
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  searchBar__unclicked: {
    marginHorizontal: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 36,
    paddingHorizontal: 16,
    backgroundColor: '#D9D9D9',
    borderRadius: 16,
  },
  searchBar: {
    marginHorizontal: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 36,
    paddingHorizontal: 16,
    backgroundColor: '#D9D9D9',
    borderRadius: 16,
  },
  input: {
    fontSize: 12,
  },
});
