import selectIco from "../../assets/select.svg";
import removeIco from "../../assets/removeBlack.svg";

export function CategoryProduct({ children, active }) {
  if (active) {
    return (
      <span className="font-inter font-bold text-[10px] lg:text-sm text-(--preto) bg-(--cinza) rounded-full border-2 border-(--cinza) px-1 py-1 lg:px-2 lg:py-2">
        {children}
      </span>
    );
  } else {
    return (
      <span className="font-inter font-bold text-[10px] lg:text-sm text-(--noEstoque) bg-(--cinza) rounded-full border-2 border-(--cinza) cursor-not-allowed px-1 py-1 lg:px-2 lg:py-2">
        {children}
      </span>
    );
  }
}
