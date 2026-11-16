# 📦 Gerenciador de Produtos - Fase 2 (Integração com API Externa)

Bem-vindo à **Fase 2** do Gerenciador de Produtos.

## 🚀 O que está sendo feito nesta fase?

A interface visual construída na Fase 1 está pronta, mas agora ela ganha vida. Substituímos os dados simulados locais por dados dinâmicos advindos de uma **API Pública**.

O objetivo principal desta fase é testar e consolidar os conhecimentos em requisições assíncronas no React, utilizando métodos como `fetch` ou bibliotecas como `axios`, lidando com estados de carregamento (loading), sucesso e erros (tratamento de exceções).

## ⚙️ Tecnologias Utilizadas

- ReactJS + Tailwind CSS
- Fetch API / Axios (Consumo de dados externos)
- API Pública (para simulação de endpoints)

<br>

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

<br>

## 🚦 Hooks explicados

**useDebounce**: devolve uma cópia atrasada de um valor. Essa cópia só muda depois que o valor original fica delay milissegundos sem mudar. Ele não sabe nada de API nem de requisição. Digitando "iph" com uma tecla a cada 100ms:
```bash
0 ms     term = "i"     → timer agendado
100 ms   term = "ip"    → timer anterior cancelado, novo agendado
200 ms   term = "iph"   → timer anterior cancelado, novo agendado
700 ms   (sem digitar)  → debounced vira "iph"
```
<br>

**useProducts(term)**: executa a busca na API sempre que o term recebido muda e expõe o resultado em três estados: products, loading e error. Ele não faz debounce. Usa o term que recebe, e o debounce é aplicado antes, no RenderApi, quando você passa o debouncedTerm.
<br>

**Como os dois trabalham juntos:**

```markdown
digita → term (imediato) → useDebounce → debouncedTerm (após 500 ms parado)
                                              ↓
                                   useProducts dispara o effect
                                              ↓
                          findProducts → API → products / loading / error
                                              ↓
                                   RenderApi redesenha a lista
```
---
<br>

⬅️ **[Voltar para a Visão Geral e Testes](https://github.com/isacarrd/gereciadorTeste/tree/main)**
<br>
⬅️ **[Veja a Fase 1 (Dados simulados)](https://github.com/isacarrd/GerenciadorFase1)**
<br>
➡️ [**Avançar para a Fase 3: Backend e Banco de Dados**](./caminho-para-fase-3 "‌")