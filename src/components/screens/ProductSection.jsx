export default function ProductSection() {
  return (
    <section className="w-full flex flex-col gap-3 lg:gap-10">
      <div className="w-full flex flex-row items-center justify-between">
        <div id="aboutProduct" className="flex flex-col w-fit gap-2 lg:gap-4">
          <h4 className="text-(--preto) text-xs lg:text-base font-bold font-inter">
            Products:
          </h4>
          <div
            id="categories"
            className="w-fit flex flex-row flex-wrap gap-3 lg:gap-2 items-center"
          >
            {/* botão de selecionar a categoria */}
            <button>Selecionar categoria</button>
          </div>
        </div>
        {/* Lógica de criar produto */}
        <button
          id="createProduct"
          className="w-fit h-fit font-inter text-(--branco) bg-(--marrom) rounded-full px-3 py-3 lg:px-6 lg:py-6 cursor-pointer"
          onClick={() => console.log("Clicou pra criar produto")}
        >
          <img
            src={createElementIco}
            alt="Create Product"
            className="w-4 h-4 lg:w-12 lg:h-12"
          />
        </button>
      </div>
      <div
        id="products"
        className="w-full h-fit flex flex-col flex-wrap items-center justify-center gap-4 md:flex-row lg:gap-y-10.5"
      >
        {/* Lógica de renderização */}
        {/* Abas de modais também vão aqui */}
      </div>
    </section>
  );
}
