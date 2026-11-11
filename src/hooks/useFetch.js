import axios from "axios";
import { useEffect, useState } from "react";
import api from "../services/api";

/* useFetch -> Para GETs simples */
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // API nativa do JavaScript que serve para cancelar operações assíncronas em andamento

    api
      .get(url, { signal: controller.signal })
      .then((res) => setData(res.data))
      .catch((err) => {
        if (!axios.isCancel(err)) setError(err); // ignora requisição cancelada
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    // cleanup: cancela a requisição se o componente desmontar ou a url mudar
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}