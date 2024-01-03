import { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const [user, setUser] = useState({});

  const [activeCategory, setActiveCategory] = useState(
    "7a2951a9-8721-4513-924e-bad3dfa5867e"
  );

  const [activeRecipe, setActiveRecipe] = useState("");
  const [activeRecipeDetails, setActiveRecipeDetails] = useState({});
  const [recognizedIngredients, setRecognizedIngredients] = useState([]);

  return (
    <Context.Provider
      value={{
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        user,
        setUser,
        activeCategory,
        setActiveCategory,
        activeRecipe,
        setActiveRecipe,
        activeRecipeDetails,
        setActiveRecipeDetails,
        recognizedIngredients,
        setRecognizedIngredients,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
