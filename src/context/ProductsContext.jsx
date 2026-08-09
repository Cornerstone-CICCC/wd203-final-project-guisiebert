import { createContext, useContext, useEffect, useState } from "react";
import { adaptProducts } from "../data/adaptProducts";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Loads the menu once, when the app mounts.
  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((json) => setProducts(adaptProducts(json)))
      .catch((error) => console.error("Could not load", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>{children}</ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
