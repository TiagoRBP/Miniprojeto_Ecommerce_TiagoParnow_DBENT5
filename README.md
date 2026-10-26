# 🛒 Sistema de Gerenciamento de E-Commerce (TypeScript & Node.js)

> **Mini-Projeto Avaliativo — Módulo 1 (Semana 07)**  
> Curso de Desenvolvimento Back-End Node.js | SCTec

---

## 📋 Sumário
- [1. Identificação do Desenvolvedor](#1-identificação-do-desenvolvedor)
- [2. Visão Geral e Objetivo](#2-visão-geral-e-objetivo)
- [3. Arquitetura e Módulos do Sistema](#3-arquitetura-e-módulos-do-sistema)
- [4. Tecnologias Utilizadas](#4-tecnologias-utilizadas)
- [5. Estrutura de Pastas e Arquivos](#5-estrutura-de-pastas-e-arquivos)
- [6. Instruções de Instalação e Execução](#6-instruções-de-instalação-e-execução)
- [7. Regras de Negócio e Programação Defensiva](#7-regras-de-negócio-e-programação-defensiva)
- [8. Manual das Principais Funções](#8-manual-das-principais-funções)
- [9. Relatório de Testes de QA (Quality Assurance)](#9-relatório-de-testes-de-qa-quality-assurance)
- [10. Limitações Conhecidas do Sistema](#10-limitações-conhecidas-do-sistema)

---

## 1. Identificação do Desenvolvedor
* **Nome:** Tiago Rafael Ballus Parnow
* **Turma:** D.B.E.N.T5
* **Repositório GitHub:** [Miniprojeto_Ecommerce_TiagoParnow_DBENT5](https://github.com/TiagoRBP/Miniprojeto_Ecommerce_TiagoParnow_DBENT5.git)

---

## 2. Visão Geral e Objetivo
A aplicação é uma API simulada para gerenciamento completo de um e-commerce desenvolvida em **TypeScript** e **Node.js**. Seu objetivo principal é fornecer uma arquitetura sólida, modular e fortemente protegida por **Programação Defensiva**, garantindo a integridade dos dados durante todo o ciclo de vida comercial:

1. **Gestão de Produtos:** Controle rigoroso de estoque, preços e catálogo.
2. **Gestão de Clientes:** Cadastro e buscas com validação e integridade de e-mails/IDs únicos.
3. **Carrinho de Compras:** Cálculo dinâmico de subtotais e totais, além de trava contra estouro de estoque.
4. **Checkout e Pedidos:** Finalização atômica de compras, preservando o *price snapshot* no momento da transação e realizando a baixa real do estoque.
5. **Auditoria e QA:** Suíte de testes automatizada em `main.ts` com relatórios organizados em tabelas (`console.table`).

---

## 3. Arquitetura e Módulos do Sistema
A aplicação adota o padrão de separação de responsabilidades em módulos independentes (`src/`):

* **`types.ts`**: Contrato global de tipos e interfaces do TypeScript (`Produto`, `Cliente`, `ItemCarrinho`, `Pedido`, etc.).
* **`produtos.ts`**: Gerenciamento de catálogo, busca avançada, filtros, alteração de preço/estoque e remoção.
* **`clientes.ts`**: Validação e cadastro defensivo de novos clientes.
* **`carrinho.ts`**: Operações do carrinho, soma acumulada com `.reduce()` e bloqueio de inconsistências.
* **`pedidos.ts`**: Módulo transacional que converte o carrinho em pedido, garante integridade, grava snapshots e baixa o estoque no catálogo.
* **`main.ts`**: Ponto de entrada que executa a suíte completa de **Test Cases (`[TC-XX]`)** para validação das regras felizes e cenários de exceção.

---

## 4. Tecnologias Utilizadas
* **Linguagem:** [TypeScript 5.x](https://www.typescriptlang.org/) (Tipagem explícita, interfaces e utilitários)
* **Ambiente de Execução:** [Node.js](https://nodejs.org/)
* **Execução em Desenvolvimento:** `tsx` (Executor rápido sem necessidade de *build* prévio)
* **Controle de Versão:** [Git](https://git-scm.com/) e [GitHub](https://github.com/)

---

## 5. Estrutura de Pastas e Arquivos
```text
Gerenciamento_E-commerce_TiagoParnow_D.B.E.N.T5/
├── src/
│   ├── types.ts          # Interfaces e Tipos globais
│   ├── produtos.ts       # Módulo do Catálogo de Produtos
│   ├── clientes.ts       # Módulo de Cadastro de Clientes
│   ├── carrinho.ts       # Módulo de Regras do Carrinho
│   ├── pedidos.ts        # Módulo Transacional de Pedidos
│   └── main.ts           # Suíte Principal de Testes e QA
├── .gitignore            # Arquivos e diretórios ignorados pelo Git
├── package.json          # Dependências e scripts do Node.js
├── tsconfig.json         # Configurações do Compilador TypeScript
└── README.md             # Documentação do Projeto

Com certeza, Tiago! Aqui tens exatamente a continuação das **seções 6 até a 10**, formatadas corretamente em Markdown e com todas as caixas de código devidamente fechadas com as crases (`````) para que o VS Code mantenha as cores e a formatação perfeitas:

```

## 6. Instruções de Instalação e Execução

### Pré-requisitos
* Node.js instalado (versão 18.0.0 ou superior).
* Git instalado na máquina.

### Passo a Passo

1. **Clonar o Repositório:**
   ```bash
   git clone [https://github.com/TiagoRBP/Miniprojeto_Ecommerce_TiagoParnow_DBENT5.git](https://github.com/TiagoRBP/Miniprojeto_Ecommerce_TiagoParnow_DBENT5.git)

2. **Entrar no Diretório:**
```bash
cd Miniprojeto_Ecommerce_TiagoParnow_DBENT5

```
3. **Instalar Dependências:**
```bash
npm install

```
4. **Executar a Aplicação e a Suíte de QA:**
```bash
npx tsx src/main.ts

```
5. **(Opcional) Compilar para JavaScript nativo (`dist/`):**
```bash
npx tsc
node dist/main.js

```
---

## 7. Regras de Negócio e Programação Defensiva

### 📦 Produtos

* Identificador (`id`) único e obrigatório.
* Preço estritamente maior que zero (`preco > 0`).
* Estoque não pode ser negativo (`estoque >= 0`).
* **Reabastecimento Inteligente:** Se um produto com o mesmo nome for adicionado novamente, o sistema incrementa a quantidade no estoque existente em vez de duplicar itens.

### 👤 Clientes

* Proibido cadastrar e-mails ou IDs duplicados.
* Validação de campos em branco/vazios para nome e e-mail.

### 🛒 Carrinho

* Bloqueio de inclusão de quantidades menores ou iguais a zero (`qtd <= 0`).
* Bloqueio de inserção de itens sem estoque disponível suficiente no catálogo.
* Se um item já existir no carrinho, a quantidade é incrementada dinamicamente.
* Cálculo transparente de subtotal por item e total geral com o método `.reduce()`.

### 🛍️ Pedidos & Checkout

* **Atomidade Transacional:** Não permite finalizar pedidos com carrinho vazio ou cliente inexistente.
* **Price Snapshot:** O valor unitário salvo no pedido é congelado na hora do checkout. Alterações futuras no preço do produto no catálogo não afetam o histórico financeiro do pedido.
* **Baixa Real de Estoque:** Assim que o pedido é concluído com status `'CONCLUIDO'`, o estoque de cada produto participante é atualizado no catálogo.
* Esvaziamento automático do carrinho após o processamento com sucesso.

---

## 8. Manual das Principais Funções

### Módulo de Produtos (`produtos.ts`)

* `listarProdutos()`: Retorna o array completo do catálogo.
* `buscarProdutoPorId(id: number)`: Localiza o produto único pelo ID.
* `buscarProdutosPorNome(termo: string)`: Realiza busca parcial (case insensitive).
* `buscarProdutosPorCategoria(categoria: string)`: Filtra por categoria específica.
* `adicionarProduto(produto: Produto)`: Insere novos itens ou reabastece o existente.
* `atualizarProduto(id: number, dados: Partial<Produto>)`: Atualiza campos respeitando as validações.
* `removerProduto(id: number)`: Remove o item do catálogo.

### Módulo de Carrinho (`carrinho.ts`)

* `adicionarAoCarrinho(produtoId: number, quantidade: number)`: Adiciona/incrementa itens validando estoque.
* `alterarQuantidadeCarrinho(produtoId: number, novaQuantidade: number)`: Ajusta unidades no carrinho.
* `removerDoCarrinho(produtoId: number)`: Remove um item do carrinho.
* `calcularTotalCarrinho()`: Soma os valores totais vigentes usando `.reduce()`.
* `limparCarrinho()`: Reseta o carrinho.

### Módulo de Pedidos (`pedidos.ts`)

* `finalizarPedido(clienteId: number)`: Executa a validação do carrinho e do cliente, congela preços, efetua a baixa no estoque e registra a compra.
* `buscarPedidoPorId(id: number)`: Consulta pedido individual.
* `buscarPedidosPorCliente(clienteId: number)`: Filtra histórico de compras do cliente.

---

## 9. Relatório de Testes de QA (Quality Assurance)

A aplicação possui uma suíte integrada executada diretamente em `src/main.ts`. Cada funcionalidade é submetida a **Test Cases (`[TC-XX]`)** auditáveis no terminal.

### Exemplos de Cenários Validados:

* **`[TC-01 a TC-12] - Módulo Produtos`**: Validações de catálogo, reabastecimento inteligente, atualização de preços, buscas e captura de erros para preço negativo ou IDs ausentes.
* **`[TC-01 a TC-06] - Módulo Clientes`**: Cadastro com sucesso, busca por ID e rejeição defensiva de e-mails/IDs duplicados ou nomes vazios.
* **`[TC-01 a TC-09] - Módulo Carrinho`**: Adição de itens, bloqueio de estoque insuficiente, alteração de quantidades e cálculo acumulado com `.reduce()`.
* **`[TC-01 a TC-08] - Módulo Pedidos`**: Bloqueio de checkout com carrinho vazio ou cliente inválido, criação do pedido, limpeza automática do carrinho e confirmação da **baixa de estoque no catálogo**.

---

## 10. Limitações Conhecidas do Sistema

* **Persistência em Memória:** Os dados são mantidos no runtime do Node.js e são resetados a cada nova execução (sem banco de dados relacional/arquivos JSON externos).
* **Escopo Comercial:** O projeto não contempla autenticação (passwords/JWT), cupons de desconto, cálculo de frete ou gateway de pagamento real, mantendo o foco exclusivo na lógica e arquitetura Back-End.

```
