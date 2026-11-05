import "./index.css"
import Header from "./components/ui/Header";
import SearchSection from "./components/screens/SearchSection";
import ProductCard from "./components/form/ProductCard";
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-lvh bg-(--bgColor)">
      <Header />
      <main className="flex flex-col px-6 py-12 gap-12 lg:px-25 lg:py-14 lg:gap-30">
        <SearchSection />
        <ProductCard
          prodId={1}
          prodName={"Nome"}
          prodDesc={"Descrição"}
          prodCateg={["Categoria1", "Categoria2", "Categoria3"]}
          prodStock={1}
        />
      </main>
    </div>
  );
}

export default App
