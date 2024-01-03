import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Keyboard,
  FlatList,
  Animated,
} from 'react-native';
import React, { useLayoutEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useStateContext } from '@/Context/StateContext';
import { searchRecipes } from '@/Hooks/recipeHooks';
import { Feather, Entypo } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

export default function SearchScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSummit = async (e) => {
    e.preventDefault();
    await search(searchPhrase, 0, 20);
  };

  const { accessToken } = useStateContext();

  const { search, recipes, isRecipeLoading, recipeError } =
    searchRecipes(accessToken);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Search</Text>
        </View>

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

        {isRecipeLoading ? (
          <View style={{ paddingTop: 12 }}>
            <ActivityIndicator size="large" color="#E00034" style={{}} />
            <Text
              style={{
                color: '#A80027',
                textAlign: 'center',
                paddingBottom: 20,
                fontSize: 14,
              }}
            >
              Please wait...
            </Text>
          </View>
        ) : recipes == null ? (
          <Text
            style={{
              color: '#A80027',
              textAlign: 'center',
              paddingBottom: 20,
              fontSize: 14,
            }}
          >
            <></>
          </Text>
        ) : recipes.data.data.length == 0 ? (
          <Text
            style={{
              color: '#A80027',
              textAlign: 'center',
              paddingBottom: 20,
              paddingTop: 20,
              fontSize: 14,
            }}
          >
            No recipe found!
          </Text>
        ) : (
          <FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
              { useNativeDriver: false }
            )}
            data={recipes.data.data}
            renderItem={({ index, item }) => (
              <ReciCard
                id={item.id}
                recipeName={item.recipeName}
                imgPath={item.image}
                cookingTime={item.cookingTime}
                category={item.recipeCategory.recipeCategoryName}
                style={{ marginRight: index % 2 !== 0 ? 0 : '4%' }}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            numColumns={2}
            keyExtractor={(item, index) => index}
            style={styles.mainView}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flex: 1,
  },
  headerContainer: {
    height: 54,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: '#E00034',
    fontWeight: 500,
  },

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
  mainView: {
    padding: 16,
    paddingBottom: 32,
  },
});
