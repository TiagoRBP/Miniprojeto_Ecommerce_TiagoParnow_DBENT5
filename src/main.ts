import { 
    adicionarProduto, 
    listarProdutos, 
    buscarProdutoPorId, 
    buscarProdutosPorCategoria, 
    buscarProdutosPorNome, 
    atualizarProduto, 
    removerProduto 
} from './produtos.js';

import { 
    listarClientes, 
    buscarClientePorId, 
    adicionarCliente 
} from "./clientes.js";

import { 
    adicionarAoCarrinho, 
    alterarQuantidadeCarrinho, 
    removerDoCarrinho, 
    listarCarrinho, 
    calcularTotalCarrinho 
} from "./carrinho.js";

// ==========================================
// 🧪 INICIANDO TESTES DE QA - PRODUTOS
// ==========================================

console.log("==========================================");
console.log("🧪 INICIANDO TESTES DE QA - PRODUTOS");
console.log("==========================================");

// 1. Listando o catálogo inicial
console.log("\n📋 [TC-01] Listando catálogo inicial de produtos:");
console.table(listarProdutos());

// 2. Testando Reabastecimento Inteligente
console.log("\n🔄 [TC-02] Testando reabastecimento inteligente (Ryzen 5 5600):");
adicionarProduto({ 
    id: 99, 
    nome: "Processador AMD Ryzen 5 5600", 
    categoria: "hardware", 
    preco: 850.00, 
    estoque: 10 
});

// 3. Adicionando um novo produto de raiz
console.log("\n✨ [TC-03] Adicionando um novo produto (SSD NVMe):");
adicionarProduto({ 
    id: 13, 
    nome: "SSD NVMe 1TB M.2", 
    categoria: "hardware", 
    preco: 450.00, 
    estoque: 20 
});

// 4. Buscando por ID
console.log("\n🔍 [TC-04] Buscando produto com ID 2 (Placa de Vídeo):");
console.log(buscarProdutoPorId(2));

console.log("\n🔍 [TC-05] Testando busca por ID inexistente (999):");
const produtoInexistente = buscarProdutoPorId(999);
if (!produtoInexistente) {
    console.log("ℹ️ Produto com ID 999 não foi encontrado (retorno undefined esperado).");
}

// 5. Buscando por Categoria
console.log("\n🏷️ [TC-06] Filtrando produtos da categoria 'moveis':");
console.table(buscarProdutosPorCategoria("moveis"));

// 6. Buscando por Nome
console.log("\n🔎 [TC-07] Pesquisando produtos que contêm 'Teclado':");
console.table(buscarProdutosPorNome("Teclado"));

// 7. Atualizando um Produto
console.log("\n✏️ [TC-08] Atualizando o preço do Processador (ID 1) para 799.00:");
atualizarProduto(1, { preco: 799.00, estoque: 25 });
console.log(buscarProdutoPorId(1));

// 8. Removendo um Produto
console.log("\n🗑️ [TC-09] Removendo o produto ID 3 (Memória RAM):");
const removido = removerProduto(3);
console.log("Produto removido com sucesso:", removido);
console.table(listarProdutos());

// 9. Testando Tratamento de Erros (Try/Catch)
console.log("\n❌ [TC-10] [ERRO ESPERADO] Testando cenários de erro (Atualizar ID inexistente):");
try {
    atualizarProduto(999, { preco: 100 });
} catch (error: any) {
    console.error("✅ [Erro capturado com sucesso]:", error.message);
}

console.log("\n❌ [TC-11] [ERRO ESPERADO] Testando cenários de erro (Remover ID inexistente):");
try {
    removerProduto(888);
} catch (error: any) {
    console.error("✅ [Erro capturado com sucesso]:", error.message);
}

console.log("\n❌ [TC-12] [ERRO ESPERADO] Testando cenários de erro (Preço negativo):");
try {
    adicionarProduto({
        id: 99,
        nome: "Produto Inválido",
        categoria: "hardware",
        preco: -10,
        estoque: 5
    });
} catch (error: any) {
    console.error("✅ [Erro capturado com sucesso]:", error.message);
}

console.log("\n==========================================");
console.log("✅ FIM DOS TESTES DE QA - PRODUTOS");
console.log("==========================================");


// ==========================================
// 🧪 INICIANDO TESTES DE QA - CLIENTES
// ==========================================

console.log("\n==========================================");
console.log("🧪 INICIANDO TESTES DE QA - CLIENTES");
console.log("==========================================");

// 1. Teste de Listagem Inicial
console.log("\n📋 [TC-01] Listando clientes cadastrados inicialmente:");
console.table(listarClientes());

// 2. Teste de Busca por ID Válido e Inválido
console.log("\n🔍 [TC-02] Testando busca por ID:");
const clienteEncontrado = buscarClientePorId(2);
console.log("Busca ID 2 (Sucesso):", clienteEncontrado);

const clienteInexistente = buscarClientePorId(99);
console.log("Busca ID 99 (Deve retornar undefined):", clienteInexistente);

// 3. Teste de Cadastro Válido
console.log("\n✨ [TC-03] Testando cadastro de novo cliente válido:");
try {
    adicionarCliente({
        id: 6,
        nome: "Beatriz Oliveira",
        email: "beatriz.oliveira@email.com"
    });
    console.table(listarClientes());
} catch (error: any) {
    console.error(error.message);
}

// 4. Testes Defensivos (Cenários de Erro)
console.log("\n🛡️ [TC-04] Testando validações defensivas (ID duplicado):");
try {
    adicionarCliente({
        id: 2,
        nome: "Teste Duplicado ID",
        email: "outro.email@email.com"
    });
} catch (error: any) {
    console.log("✅ Erro capturado com sucesso:", error.message);
}

console.log("\n🛡️ [TC-05] Testando validações defensivas (E-mail duplicado):");
try {
    adicionarCliente({
        id: 7,
        nome: "Teste Duplicado Email",
        email: "ana.luiza@email.com"
    });
} catch (error: any) {
    console.log("✅ Erro capturado com sucesso:", error.message);
}

console.log("\n🛡️ [TC-06] Testando validações defensivas (Nome vazio):");
try {
    adicionarCliente({
        id: 8,
        nome: "",
        email: "vazio@email.com"
    });
} catch (error: any) {
    console.log("✅ Erro capturado com sucesso:", error.message);
}

console.log("\n==========================================");
console.log("✅ FIM DOS TESTES DE QA - CLIENTES");
console.log("==========================================");


// ==========================================
// 🧪 INICIANDO TESTES DE QA - CARRINHO
// ==========================================

console.log("\n==========================================");
console.log("🧪 INICIANDO TESTES DE QA - CARRINHO");
console.log("==========================================");

// 1. TESTES DE ADIÇÃO AO CARRINHO
console.log("\n🛒 [TC-01] Adicionar produtos válidos ao carrinho:");
try {
    adicionarAoCarrinho(1, 2); // 2x Processador (ID 1)
    adicionarAoCarrinho(3, 1); // 1x Memória RAM (ID 3)
    console.table(listarCarrinho());
} catch (erro: any) {
    console.error("❌ Falha inesperada:", erro.message);
}

console.log("\n🔄 [TC-02] Incrementar quantidade de produto já existente:");
try {
    adicionarAoCarrinho(1, 1); // Adiciona +1 Processador
    console.table(listarCarrinho());
} catch (erro: any) {
    console.error("❌ Falha inesperada:", erro.message);
}

console.log("\n❌ [TC-03] [ERRO ESPERADO] Tentar adicionar quantidade inválida (<= 0):");
try {
    adicionarAoCarrinho(1, 0);
} catch (erro: any) {
    console.log("✅ Validação funcionou perfeitamente:", erro.message);
}

console.log("\n❌ [TC-04] [ERRO ESPERADO] Tentar adicionar quantidade que excede o estoque:");
try {
    adicionarAoCarrinho(1, 100);
} catch (erro: any) {
    console.log("✅ Validação de estoque funcionou:", erro.message);
}

// 2. TESTES DE ALTERAÇÃO DE QUANTIDADE
console.log("\n✏️ [TC-05] Alterar quantidade de um item para valor válido:");
try {
    alterarQuantidadeCarrinho(3, 5); // Altera Memória RAM (ID 3) para 5 unidades
    console.table(listarCarrinho());
} catch (erro: any) {
    console.error("❌ Falha inesperada:", erro.message);
}

console.log("\n❌ [TC-06] [ERRO ESPERADO] Alterar quantidade de item inexistente no carrinho:");
try {
    alterarQuantidadeCarrinho(99, 2);
} catch (erro: any) {
    console.log("✅ Validação funcionou:", erro.message);
}

// 3. TESTES DE REMOÇÃO E CÁLCULO TOTAL (.REDUCE)
console.log("\n💰 [TC-07] Calcular valor total do carrinho:");
const totalInicial = calcularTotalCarrinho();
console.log(`Valor Total Acumulado com .reduce(): R$ ${totalInicial.toFixed(2)}`);

console.log("\n🗑️ [TC-08] Remover produto do carrinho:");
try {
    removerDoCarrinho(1); // Remove os Processadores (ID 1)
    console.table(listarCarrinho());
    console.log(`Novo Valor Total: R$ ${calcularTotalCarrinho().toFixed(2)}`);
} catch (erro: any) {
    console.error("❌ Falha inesperada:", erro.message);
}

console.log("\n❌ [TC-09] [ERRO ESPERADO] Tentar remover produto que já não está no carrinho:");
try {
    removerDoCarrinho(1);
} catch (erro: any) {
    console.log("✅ Validação funcionou:", erro.message);
}

console.log("\n==========================================");
console.log("✅ FIM DOS TESTES DE QA - CARRINHO");
console.log("==========================================");
