import { useLocalProducts } from "../../context/ProductsContext";
import useDebounce from "../../hooks/useDebounce";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../form/ProductCard";

export default function RenderApi({ term = "" }) {
  const { created, updated } = useLocalProducts();
  const debouncedTerm = useDebounce(term, 500);
  const { products, loading, error } = useProducts(debouncedTerm);
  
  // aplica as edições por cima do produto original
  const withEdits = (p) => ({ ...p, ...updated[p.id] });

  // os criados também respondem à busca (ID, nome ou categoria)
  const q = debouncedTerm.trim().toLowerCase();
  
  const createdMatch = created
    .map(withEdits) // edita antes de filtrar, para a busca enxergar o nome novo
    .filter(
      // existe porque a busca da API não conhece os produtos locais
      (p) =>
        !q ||
        String(p.id) === q ||
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );

  const list = [...products.map(withEdits), ...createdMatch];

  /*   
  PARA TESTE
  console.log(
    "term:",
    term,
    "| debounced:",
    debouncedTerm,
    "| loading:",
    loading,
    "| qtd:",
    products.length
  );
 */
  
  return (
    <>
      {loading && (
        <span className="py-5 font-inter text-(--error) text-sm lg:text-xl text-center w-full">
          Carregando...
        </span>
      )}
      {error && (
        <span className="py-5 font-inter text-(--error) text-sm lg:text-xl text-center w-full">
          Erro ao carregar os produtos
        </span>
      )}

      {!loading && !error && list.length === 0 && (
        <p className="py-5 font-inter text-(--error) text-sm lg:text-xl text-center w-full">
          Produto não encontrado, busque por: ID, Nome ou Categoria!
        </p>
      )}

      {!loading &&
        list.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
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
