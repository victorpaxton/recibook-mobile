import { useState, useEffect } from "react";

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

export { useIngredientAnalysis };
