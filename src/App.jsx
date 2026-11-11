import "./index.css"
import { useState } from "react";
import Header from "./components/ui/Header";
import SearchSection from "./components/screens/SearchSection";
import ProductSection from "./components/screens/ProductSection";

function App() {
  const [term, setTerm] = useState("")
  // term -> o que escrevemos

  return (
    <div className="h-lvh bg-(--bgColor)">
      <Header />
      <main className="flex flex-col px-6 py-12 gap-12 lg:px-25 lg:py-14 lg:gap-30">
        <SearchSection texto={term} setTexto={setTerm} />
        <ProductSection term={term} />
      </main>
    </div>
  );
}

export default App
