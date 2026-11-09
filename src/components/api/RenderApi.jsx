import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../form/ProductCard";

export default function RenderApi() {
  const [products, setProducts] = useState([]); // vai retornar todos os produtos
  const [loading, setLoading] = useState(true);

  let api = "https://dummyjson.com/products?limit=6"; // url base

  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        setProducts(res.data.products); // res.data -> objeto -- res.data.products -> array de produtos
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [api]);

  return (
    <>
      {loading ? (
        <span>Carregando</span>
      ) : (
        products.map((prod) => (
          <ProductCard
            key={prod.id}
            prodId={prod.id}
            prodImg={prod.thumbnail}
            prodName={prod.title}
            prodDesc={prod.description}
            prodCateg={prod.tags}
            prodStock={prod.stock}
          />
        ))
      )}
    </>
  );
}
