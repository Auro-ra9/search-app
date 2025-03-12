import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { DEBOUNCE_DELAY, POPULAR_SEARCHES } from "../utils/constants";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import { fetchProducts } from "../api/ProductApi";
import { Product } from "../types";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm) {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError("");

    const controller = new AbortController();
    try {
      const data = await fetchProducts(searchTerm, controller);
      setProducts(data || []);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, DEBOUNCE_DELAY);

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          debouncedSearch(e.target.value);
        }}
        placeholder="Search for products..."
        className="w-full p-2 border rounded-md"
      />

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}

      {!query && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Popular Searches:</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {POPULAR_SEARCHES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {products.length === 0 && query && !loading && (
        <p className="text-gray-500 mt-4">No products found.</p>
      )}

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default SearchInput;
