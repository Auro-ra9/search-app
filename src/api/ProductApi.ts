const API_URL = "https://fakestoreapi.in/api/products?limit=15";

export const fetchProducts = async (
  query: string,
  controller: AbortController
) => {
  try {
    const response = await fetch(`${API_URL}&q=${query}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.log("Requested canceled", query);
    } else {
      throw err;
    }
  }
};
