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

export { getRecipeCategories, getRecipesByCategory };
