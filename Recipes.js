import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [meals, setMeals] = useState([]);

  const searchMeals = () => {
    axios
      .get(API_URL, { params: { s: searchQuery } })
      .then((response) => {
        const { meals } = response.data;
        setMeals(meals || []);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search meals..."
        placeholderTextColor="#808080"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Button title="Search" onPress={searchMeals} color="#f8f8f8" />
      <ScrollView style={styles.mealsContainer}>
        {meals.map((meal) => (
          <View key={meal.idMeal} style={styles.mealCard}>
            <Text style={styles.mealTitle}>{meal.strMeal}</Text>
            <Image
              source={{ uri: meal.strMealThumb }}
              style={styles.mealImage}
            />
            <Text style={styles.mealInstructions}>{meal.strInstructions}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "slateblue",
    marginTop: 60,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "darkslateblue",
    paddingHorizontal: 10,
    color: "#f8f8f8",
  },
  mealsContainer: {
    marginTop: 10,
  },
  mealCard: {
    marginBottom: 20,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f8f8f8",
  },
  mealImage: {
    width: 300,
    height: 200,
    marginVertical: 10,
  },
  mealInstructions: {
    color: "#f8f8f8",
  },
});
