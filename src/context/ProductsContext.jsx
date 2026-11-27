/* eslint-disable react-refresh/only-export-components */


import { createContext, useContext, useState } from "react";
import { createProduct, updateProduct } from "../services/productService";

/* Apenas o ADD (create) e PUT (update) por enquanto! */

/* O Context é uma área de estado compartilhado: qualquer componente dentro do Provider pode ler e usar o que está lá, sem passar props por vários níveis. Ele tem três peças que estão enumeradas no código. */

const ProductsContext = createContext(null); // 1. o "canal"

export function ProductsProvider({ children }) { // 2. quem guarda e publica
  const [created, setCreated] = useState([]);
  const [updated, setUpdated] = useState([])

  const addProduct = async (data) => {
    // a imagem (data URL) fica só no app e não vai para a API
    const { thumbnail, ...payload } = data;

    const res = await createProduct(payload);

    setCreated((prev) => [
      ...prev,
      {
        ...payload,
        ...res.data, // o que a API devolveu (inclui o id)
        id: res.data.id + prev.length, // a API devolve sempre o mesmo id; o offset evita keys repetidas
        thumbnail,
        local: true, // marca que só existe aqui (vai servir no PUT/DELETE)
      },
    ]);
  };

  const editProduct = async (product, data) => {
    const { thumbnail, ...payload } = data; // a imagem não vai para a API

    // produto criado aqui não existe na API (daria 404): só atualiza localmente
    if (!product.local) {
      await updateProduct(product.id, payload);
    }

    setUpdated((prev) => ({
      ...prev,
      [product.id]: { ...prev[product.id], ...data },
    }));
  }

  return (
    <ProductsContext.Provider value={{ created, updated,addProduct, editProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useLocalProducts = () => useContext(ProductsContext); // 3. atalho de leitura

// basicamente, o ProductsProvider é um componente que guarda o estado e a(s) funções, e os publica em 'value'
// o useLocalProducts só poupa de escrever sempre o 'useContext(ProductsContext' em cada componente