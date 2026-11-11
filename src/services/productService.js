import api from "./api";

export const getProducts = (limit = 15, signal) => // pega todos os produtos
  api.get("/products", { params: { limit }, signal });

export const getProductById = (id, signal) => // pega o produto por id
  api.get(`/products/${id}`, { signal });

export const getProductsByCategory = (category, signal) => // pega os produtos por categoria
  api.get(`/products/category/${category}`, { signal });

export const searchProducts = (q, signal) => 
  api.get("/products/search", { params: { q }, signal }); // o axios já faz o encodeURIComponent

// a lista de categorias não muda, então busca uma vez e guarda
let categoriesCache = null;
export const getCategories = async (signal) => {
  if (!categoriesCache) {
    const res = await api.get("/products/category-list", { signal });
    categoriesCache = res.data;
  }
  return categoriesCache;
};

// o equivalente ao buscandoDados: decide qual endpoint usar
// e sempre devolve um ARRAY de produtos
export async function findProducts(term, signal) {
  const query = term.trim(); // tira os espaços em branco do campo

  if (!query) {
    const res = await getProducts(15, signal);
    return res.data.products;
  }

  if (/^\d+$/.test(query)) { // garante que a string inteira é composta exclusivamente por números -> "123" passa, mas "123a" não
    const res = await getProductById(query, signal);
    return [res.data]; // por id vem um objeto só, então vira array
  }

  const categories = await getCategories(signal);
  const normalized = query.toLowerCase().replace(/\s+/g, "-"); // "mens shirts" -> "mens-shirts"
  const category = categories.find((cat) => cat.includes(normalized));

  if (category) {
    const res = await getProductsByCategory(category, signal);
    return res.data.products;
  }

  const res = await searchProducts(query, signal);
  return res.data.products;
}

// disparadas por evento (submit), sem o hook
export const createProduct = (data) => api.post("/products/add", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);