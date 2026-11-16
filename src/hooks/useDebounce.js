import { useState, useEffect } from "react";

// serve para controlar a frequência de execução
// -> devolve uma cópia atrasada de um valor, e essa cópia só muda depois que o valor original fica delay milissegundos sem mudar

export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  /* 1. o debounced já nasce igual a value (sem espera);
    2. quando value muda, o react renderiza e roda o effect que agenda um setTimeout para copiar o valor novo pra debounced;
    3. se value mudar novamente antes dos 500ms, o react executa o cleanup do effect anterior (cancela o timer pendente) e depois roda o effect de novo, e assim continua o ciclo;
    4. se passar os 500ms sem mudança, o timer dispara e o setDebounced atualiza o estado e o componente re-renderiza com o valor novo
  */

  useEffect(() => { 
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}