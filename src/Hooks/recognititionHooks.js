import { useState, useEffect } from "react";
import axios from "axios";

const useIngredientAnalysis = (accessToken, photo) => {
  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formData = new FormData();
  // formData.append("image", {
  //   uri: photo.uri,
  //   type: "image/jpeg",
  //   name: "image.jpg",
  // });
  formData.append("image", {
    name: "image.jpg",
    type: "image/jpeg",
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });
  const analyzeIngredientImage = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://recibook-be-production.up.railway.app/recibook-service/ingredients-analysis/image",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          }, // Assuming imageFile is a File object or similar
        }
      );
      let responseJson = await response.json();
      setResult(responseJson); // Assuming the response contains the analysis result
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log("Error" + error);
      setLoading(false);
    }
  };

  useEffect(() => {
    analyzeIngredientImage();
  }, []);

  return { result, isLoading, error };
};
// e lam rang truyen arrray trong js
const getSuggestionRecipes = (accessToken, ingredientList) => {
  const [recipe, setRecipe] = useState(null);
  const [isRecipeSuggestionLoading, setRecipeSuggestionLoading] =
    useState(true);
  const [isRecipeSuggestionError, setRecipeSuggestionError] = useState(null);

  const options = {
    method: "POST",
    url: `https://recibook-be-production.up.railway.app/recibook-service/suggestion-recipes`,
    data: {
      ingredients: ingredientList,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchRecipeSuggestion = async () => {
    setRecipeSuggestionLoading(true);

    try {
      const response = await axios.request(options);
      setRecipe(response.data); // Assuming the response contains the detailed recipe information
      setRecipeSuggestionLoading(false);
    } catch (error) {
      setRecipeSuggestionError(error);
      console.log(error);
      setRecipeSuggestionLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeSuggestion();
  }, [accessToken, ingredientList]); // Fetch recipe Suggestion whenever the accessToken or recipeId changes

  const refetch = () => {
    setRecipeSuggestionLoading(true);
    fetchRecipeSuggestion();
  };

  return {
    recipe,
    isRecipeSuggestionLoading,
    isRecipeSuggestionError,
    refetch,
  };
};

export { useIngredientAnalysis, getSuggestionRecipes };
