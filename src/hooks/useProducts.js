import axios from "axios";
import { useEffect, useState } from "react";
import { findProducts } from "../services/productService";

// executa a busca na API sempre que o 'term' recebido muda e expõe o resultado em três estados: product, loading e error

export default function useProducts(term) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // 1. botão de cancelar desta requisição

    /* 2. marca o loading como (true) e limpa o 'error' para mostrar "Carregando" e esquece erros anteriores */
    setLoading(true);
    setError(null);

    findProducts(term, controller.signal) /* entrega o "cancelador" à requisição -> decide o endpoint (todos, id, categoria ou busca) e devolve uma Promise com um array de produtos. */
      
      .then(setProducts) // se der certo, guarda o array

      .catch((err) => { /* se der erro: 
        1. axios.isCancel ignora porque não é uma falha;
        2. erro 404 -> esvazia products e não define error, acontece quando o ID não existe, e a tela cai no “Produto não encontrado”;
        3. qualquer outro erro -> esvazia products e guarda o erro em error;
        */
        if (axios.isCancel(err)) return;
        setProducts([]);
        if (err.response?.status !== 404) setError(err); // 404 = id inexistente -> "não encontrado"
      })
      .finally(() => { // apenas desliga o loading SÓ SE a requisição não foi/for cancelada
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort(); // cleanup: aciona o cancelamento -> roda antes do próximo effect (quando o term muda) e quando o componente desmonta
  }, [term]);

  return { products, loading, error };
}