import ProductCard from "../form/ProductCard";
import useDebounce from "../../hooks/useDebounce";
import useProducts from "../../hooks/useProducts";

export default function RenderApi({ term = "" }) {
  const debouncedTerm = useDebounce(term, 500);
  const { products, loading, error } = useProducts(debouncedTerm);
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

      {!loading && !error && products.length === 0 && (
        <p className="py-5 font-inter text-(--error) text-sm lg:text-xl text-center w-full">
          Produto não encontrado, busque por: ID, Nome ou Categoria!
        </p>
      )}

      {!loading &&
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
        ))}
    </>
  );
}
