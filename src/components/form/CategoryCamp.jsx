// import { useState } from "react";
import addCategory from "../../assets/create.svg";
import required from "../../assets/required.svg";
import { SelectCategoryCreate } from "../ui/CategorySpan";

export default function CategoryCamp({ categorias, counter }) {
  // adiciona um "slot" vazio para um novo select
  const adicionarCampo = () => {
    if (counter.remaining > 0) {
      counter.handleArrayChange([...categorias, ""]);
    }
  };

  // remove pelo index
  const removerCategoria = (indexParaRemover) => {
    counter.handleArrayChange(
      categorias.filter((_, index) => index !== indexParaRemover)
    );
  };

  // atualiza o valor de um select específico
  const atualizarCategoria = (indexAtualizado, novoValor) => {
    const novoArray = [...categorias];
    novoArray[indexAtualizado] = novoValor;
    counter.handleArrayChange(novoArray);
  };

  return (
    <div className="categorias flex flex-col gap-1 lg:gap-2">
      <span className="flex flex-row items-center justify-between flex-wrap">
        <label
          htmlFor="categProduto"
          className="font-inter font-bold text-sm lg:text-xl flex justify-start"
        >
          Categoria(s)
          <img
            src={required}
            alt="Required Warning"
            className="w-3 h-3 lg:w-4 lg:h-4"
          />
        </label>

        <span className="font-inter font-medium text-(--noEstoque) text-sm lg:text-xl">
          {counter.remaining}/{counter.limit}
        </span>
      </span>

      <div className="w-full h-fit flex flex-col items-start px-2 py-2 gap-2 lg:gap-4 lg:px-4 lg:py-4 bg-(--cinza) rounded-lg lg:rounded-2xl">
        {/* Botão de Adicionar (+) */}
        <div className="flex flex-row gap-2 items-center flex-wrap">
          <button
            onClick={adicionarCampo}
            disabled={counter.remaining === 0}
            className="cursor-pointer bg-(--verdePrim) w-8 h-8 lg:w-14 lg:h-14 rounded-[10px] lg:rounded-[15px] flex items-center justify-center disabled:bg-(--noEstoque)"
          >
            <img
              src={addCategory}
              alt="Adicionar Categoria"
              className="w-3 h-3 lg:w-6 lg:h-6"
            />
          </button>
          {categorias.map((categ, index) => (
            <SelectCategoryCreate
              key={index}
              index={index}
              valorAtual={categ}
              todasSelecionadas={categorias}
              onRemove={removerCategoria}
              onSelect={atualizarCategoria}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => console.log("criou categ")}
          className="cursor-pointer font-inter font-bold text-[10px] lg:text-sm text-(--verdeSec) bg-(--branco) rounded-full border border-(--verdeSec) px-1 py-1 lg:px-2 lg:py-2 hover:text-(--preto) hover:border-(--preto)"
        >
          Criar Categoria
        </button>
      </div>
    </div>
  );
}
