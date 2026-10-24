import type { Produto } from "./types.js";

const produtos: Produto[] = [
    { id: 1, nome: "Processador AMD Ryzen 5 5600", categoria: "hardware", preco: 850.00, estoque: 15 },
    { id: 2, nome: "Placa de Vídeo RTX 3060 12GB", categoria: "hardware", preco: 1800.00, estoque: 8 },
    { id: 3, nome: "Memória RAM DDR4 16GB 3200MHz", categoria: "hardware", preco: 250.00, estoque: 30 },
    { id: 4, nome: "Licença Windows 11 Pro", categoria: "software", preco: 199.00, estoque: 50 },
    { id: 5, nome: "Assinatura Antivírus Kaspersky (1 Ano)", categoria: "software", preco: 89.00, estoque: 100 },
    { id: 6, nome: "IDE WebStorm Licença Anual", categoria: "software", preco: 350.00, estoque: 20 },
    { id: 7, nome: "Teclado Mecânico RGB Switch Blue", categoria: "perifericos", preco: 220.00, estoque: 25 },
    { id: 8, nome: "Mouse Sem Fio Logitech MX Master 3S", categoria: "perifericos", preco: 550.00, estoque: 12 },
    { id: 9, nome: "Headset Gamer 7.1 Surround", categoria: "perifericos", preco: 310.00, estoque: 18 },
    { id: 10, nome: "Cadeira Ergonômica Mesh", categoria: "moveis", preco: 890.00, estoque: 10 },
    { id: 11, nome: "Mesa para Escritório L com Suporte", categoria: "moveis", preco: 450.00, estoque: 6 },
    { id: 12, nome: "Gaveteiro Volante com Chave", categoria: "moveis", preco: 280.00, estoque: 14 }
]

/**
 * Lista todos os produtos cadastrados no catálogo.
 * @returns Um array contendo todos os produtos.
 */
export const listarProdutos = (): Produto[] => {
    return produtos;
}

/**
 * Busca um produto específico pelo seu ID único.
 * @param id - O identificador único do produto.
 * @returns O produto encontrado ou undefined caso não exista.
 */
export const buscarProdutoPorId = (id: number): Produto | undefined => {
    return produtos.find(produto => produto.id === id);
}

/**
 * Filtra e retorna todos os produtos que pertencem a uma categoria específica.
 * @param categoria - O nome da categoria a ser filtrada.
 * @returns Um array com os produtos da categoria.
 */
export const buscarProdutosPorCategoria = (categoria: string): Produto[] => {
    return produtos.filter(produto => produto.categoria === categoria);
}

/**
 * Adiciona um novo produto ao catálogo com validações de integridade 
 * e suporte a reabastecimento inteligente caso o nome já exista.
 * 
 * @param novoProduto - O objeto contendo os dados do produto.
 * @throws Error se o nome estiver vazio, o preço for menor/igual a zero, estoque negativo ou ID duplicado.
 */
export function adicionarProduto(novoProduto: Produto): void {
    if (!novoProduto.nome || novoProduto.nome.trim() === "") {
        throw new Error("Erro: O nome do produto não pode estar vazio."); // Validação 1: Nome não pode estar vazio
    }
    if (novoProduto.preco <= 0) {
        throw new Error("Erro: O preço do produto deve ser maior que zero."); // Validação 2: Preço deve ser maior que zero
    }
    if (novoProduto.estoque < 0) {
        throw new Error("Erro: O estoque do produto não pode ser negativo."); // Validação 3: Estoque não pode ser negativo
    }

    const produtoExistentePorNome = produtos.find(produto => produto.nome.toLowerCase() === novoProduto.nome.toLowerCase()); // Reabastecimento inteligente por nome

    if (produtoExistentePorNome) {
        produtoExistentePorNome.estoque += novoProduto.estoque; // Reabastece o estoque do produto existente
        console.log(`📦 O produto "${produtoExistentePorNome.nome}" já existe. Estoque incrementado! Total atual: ${produtoExistentePorNome.estoque} unidades.`);
        return;
    }

    const produtoExistentePorId = buscarProdutoPorId(novoProduto.id);
    if (produtoExistentePorId) {
        throw new Error(`Erro: Já existe um produto com o ID ${novoProduto.id}.`); // 4. Se não existe por nome, verifica se o ID é único
    }

    produtos.push(novoProduto);
    console.log(`✅ Produto "${novoProduto.nome}" adicionado com sucesso!`); // 5. Cadastra o novo produto no array
}

/**
 * Pesquisa produtos cujo nome contenha o termo especificado (busca parcial e case-insensitive).
 * 
 * @param termo - O texto ou parte do nome a ser pesquisado.
 * @returns Um array com os produtos correspondentes.
 */
export const buscarProdutosPorNome = (termo: string): Produto[] => {
    return produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo.toLowerCase())
    );
};

/**
 * Atualiza os dados de um produto existente pelo seu ID.
 * Permite atualização parcial dos campos (preço, estoque, nome, etc.).
 * @param id - O identificador único do produto
 * @param dadosAtualizados - Objeto contendo os campos a serem modificados
 * @returns O produto devidamente atualizado
 * @throws Error se o produto não for encontrado
 */
export const atualizarProduto = (id: number, dadosAtualizados: Partial<Produto>): Produto => {
    const produto = buscarProdutoPorId(id);
    if (!produto) {
        throw new Error(`Erro: Produto com ID ${id} não encontrado.`);
    }
    Object.assign(produto, dadosAtualizados);

    return produto;
};

/**
 * Remove um produto do catálogo pelo seu ID.
 * @param id - O identificador único do produto a ser removido
 * @returns O produto que foi removido
 * @throws Error se o produto não for encontrado
 */

export const removerProduto = (id: number): Produto => {
    const index = produtos.findIndex(produto => produto.id === id);
    if (index === -1) {
        throw new Error(`Erro: Produto com ID ${id} não foi encontrado para remoção.`);
    }
    const [produtoRemovido] = produtos.splice(index, 1);
    return produtoRemovido!;
};


