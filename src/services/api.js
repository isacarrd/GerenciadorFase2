import axios from "axios";

// o axios.create permite criar uma instância pré-configurada do axios, ela compartilha a mesma API de requisição e resposta padrão, mas utiliza a configuração fornecida como base para cada requisição
// -> recomendada para qualquer aplicação maior que um único arquivo

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
})

export default api;