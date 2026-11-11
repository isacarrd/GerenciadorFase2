import { useEffect } from "react";
import { allProducts } from "../../data/allProducts";
import useFetch from "../../hooks/useFetch";
import ProductCard from "../form/ProductCard";

export default function RenderApi() {
  const { data, loading, error } = useFetch("/products?limit=6");

  useEffect(() => {
    if (data) allProducts(data.products);
  }, [data]);

  if (loading) return <span className="py-5 font-inter text-(--preto) text-sm lg:text-xl text-center w-full">Carregando</span>;
  if (error) return <span className="py-5 font-inter text-(--error) text-sm lg:text-xl text-center w-full">Erro ao carregar os produtos</span>;

  return (
    <>
      {data.products.map((prod) => (
        <ProductCard
          key={prod.id}
          prodId={prod.id}
          prodImg={prod.thumbnail}
          prodName={prod.title}
          prodDesc={prod.description}
          prodCateg={prod.tags}
          prodStock={prod.stock}
        />
      ))}
    </>
  );
}
