import { useState, useEffect } from "react";
import { getCategories } from "../services/productService";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let active = true; // evita setState se o componente desmontar antes da resposta
    
    getCategories()
      .then((data) => {
        if (active) setCategories(data);
      })
      .catch((err) => console.error("Erro ao obter as categorias: ", err))
    
    return () => {
      active = false;
    }
  }, [])
  return categories;
}