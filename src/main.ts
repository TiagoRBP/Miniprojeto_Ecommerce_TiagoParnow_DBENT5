import { 
    adicionarProduto, 
    listarProdutos, 
    buscarProdutoPorId, 
    buscarProdutosPorCategoria, 
    buscarProdutosPorNome, 
    atualizarProduto, 
    removerProduto 
} from './produtos.js';

console.log("=== INICIANDO TESTES DO SISTEMA DE PRODUTOS ===\n");

// 1. Listando o catálogo inicial
console.log("-> Catálogo inicial:");
console.table(listarProdutos());

// 2. Testando Reabastecimento Inteligente (adicionando um item com nome idêntico)
console.log("-> Testando reabastecimento inteligente (Ryzen 5 5600):");
adicionarProduto({ 
    id: 99, 
    nome: "Processador AMD Ryzen 5 5600", 
    categoria: "hardware", 
    preco: 850.00, 
    estoque: 10 
});

// 3. Adicionando um novo produto de raiz
console.log("\n-> Adicionando um novo produto (SSD NVMe):");
adicionarProduto({ 
    id: 13, 
    nome: "SSD NVMe 1TB M.2", 
    categoria: "hardware", 
    preco: 450.00, 
    estoque: 20 
});

// 4. Buscando por ID
console.log("\n-> Buscando produto com ID 2 (Placa de Vídeo):");
console.log(buscarProdutoPorId(2));

console.log("\n-> Testando busca por ID inexistente (999):");
const produtoInexistente = buscarProdutoPorId(999);

if (!produtoInexistente) {
    console.log("ℹ️ Produto com ID 999 não foi encontrado (retorno undefined esperado).");
}

// 5. Buscando por Categoria
console.log("\n-> Filtrando produtos da categoria 'moveis':");
console.table(buscarProdutosPorCategoria("moveis"));

// 6. Buscando por Nome (Parcial e Case-insensitive)
console.log("\n-> Pesquisando produtos que contêm 'Teclado':");
console.table(buscarProdutosPorNome("Teclado"));

// 7. Atualizando um Produto (Partial)
console.log("\n-> Atualizando o preço do Processador (ID 1) para 799.00:");
atualizarProduto(1, { preco: 799.00, estoque: 25 });
console.log(buscarProdutoPorId(1));

// 8. Removendo um Produto
console.log("\n-> Removendo o produto ID 3 (Memória RAM):");
const removido = removerProduto(3);
console.log("Produto removido com sucesso:", removido);

console.log("\n-> Catálogo final atualizado:");
console.table(listarProdutos());

// 9. Testando Tratamento de Erros (Try/Catch)
console.log("\n-> Testando cenários de erro (validações):");

// 1. Testando erro de ID inexistente ao tentar ATUALIZAR
try {
    atualizarProduto(999, { preco: 100 });
} catch (error: any) {
    console.error("[Erro capturado com sucesso]:", error.message);
}

// 2. Testando erro de ID inexistente ao tentar REMOVER
try {
    removerProduto(888);
} catch (error: any) {
    console.error("[Erro capturado com sucesso]:", error.message);
}

// 3. Testando erro de preço inválido ao ADICIONAR
try {
    adicionarProduto({
        id: 99,
        nome: "Produto Inválido",
        categoria: "hardware",
        preco: -10, // Preço negativo proibido
        estoque: 5
    });
} catch (error: any) {
    console.error("[Erro capturado com sucesso]:", error.message);
}