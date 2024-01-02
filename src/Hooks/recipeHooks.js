import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const getRecipeCategories = (accessToken) => {
  const [recipeCategories, setRecipeCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: 'https://recibook-be-production.up.railway.app/recibook-service/recipe-categories',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setRecipeCategories(response.data); // Assuming the response contains the recipe categories
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // No dependencies for initial fetch

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { recipeCategories, isLoading, error, refetch };
};

const getRecipesByCategory = (
  accessToken,
  categoryId,
  pageNumber,
  pageSize
) => {
  const [recipes, setRecipes] = useState([]);
  const [isRecipeLoading, setRecipeLoading] = useState(true);
  const [recipeError, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://recibook-be-production.up.railway.app/recibook-service/recipe-categories/${categoryId}/recipes`,
    params: { pageNumber: pageNumber, pageSize: pageSize },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    setRecipeLoading(true);

    try {
      const response = await axios.request(options);

      setRecipes(response.data); // Assuming the response contains the recipes for the category
      setRecipeLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setRecipeLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId, pageNumber, pageSize]); // No dependencies for initial fetch

  const refetch = () => {
    setRecipeLoading(true);
    fetchData();
  };

  return { recipes, isRecipeLoading, recipeError, refetch };
};

const getRecipeDetails = (accessToken, recipeId) => {
  const [recipe, setRecipe] = useState(null);
  const [isRecipeDetailsLoading, setRecipeDetailsLoading] = useState(true);
  const [isRecipeDetailsError, setRecipeDetailsError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://recibook-be-production.up.railway.app/recibook-service/recipes/${recipeId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchRecipeDetails = async () => {
    setRecipeDetailsLoading(true);

    try {
      const response = await axios.request(options);
      setRecipe(response.data); // Assuming the response contains the detailed recipe information
      setRecipeDetailsLoading(false);
    } catch (error) {
      setRecipeDetailsError(error);
      console.log(error);
      setRecipeDetailsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [accessToken, recipeId]); // Fetch recipe details whenever the accessToken or recipeId changes

  const refetch = () => {
    setRecipeDetailsLoading(true);
    fetchRecipeDetails();
  };

  return { recipe, isRecipeDetailsLoading, isRecipeDetailsError, refetch };
};

const searchRecipes = (accessToken) => {
  const [recipes, setRecipes] = useState(null);
  const [isRecipeLoading, setRecipeLoading] = useState(false);
  const [recipeError, setError] = useState(null);

  const search = async (keyword, pageNumber, pageSize) => {
    setRecipeLoading(true);

    try {
      const options = {
        method: 'GET',
        url: `https://recibook-be-production.up.railway.app/recibook-service/recipes`,
        params: {
          keyword: keyword,
          pageNumber: pageNumber,
          pageSize: pageSize,
          sortField: 'id',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.request(options);

      setRecipes(response.data); // Assuming the response contains the recipes for the category
      setRecipeLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setRecipeLoading(false);
    }
  };

  const refetch = () => {
    setRecipeLoading(true);
    search();
  };

  return { search, recipes, isRecipeLoading, recipeError, refetch };
};

export {
  getRecipeCategories,
  getRecipesByCategory,
  getRecipeDetails,
  searchRecipes,
};
