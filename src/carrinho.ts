import type { CarrinhoItem } from "./types.js";

import { buscarProdutoPorId } from "./produtos.js";

let carrinho: CarrinhoItem[] = [];

/**
 * Retorna todos os itens atuais do carrinho.
 */
export const listarCarrinho = (): CarrinhoItem[] => carrinho;

/**
 * Adiciona um produto ao carrinho ou incrementa a quantidade se já existir,
 * validando o estoque disponível.
 */
export const adicionarAoCarrinho = (produtoId: number, quantidade: number): void => {
    if (quantidade <= 0) {
        throw new Error("Erro: A quantidade a adicionar deve ser maior que zero.");
    }

    const produto = buscarProdutoPorId(produtoId);
    if (!produto) {
        throw new Error(`Erro: Produto com ID ${produtoId} não encontrado.`);
    }

    const itemExistente = carrinho.find(item => item.produtoId === produtoId);
    const quantidadeTotalDesejada = itemExistente ? itemExistente.quantidade + quantidade : quantidade;

    if (produto.estoque < quantidadeTotalDesejada) {
        throw new Error(`Erro: Estoque insuficiente para "${produto.nome}". Disponível: ${produto.estoque}, Solicitado: ${quantidadeTotalDesejada}.`);
    }

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
        console.log(`🛒 Quantidade atualizada: "${produto.nome}" agora tem ${itemExistente.quantidade} unidades.`);
    } else {
        carrinho.push({
            produtoId: produto.id,
            quantidade: quantidade,
            valorUnitario: produto.preco
        });
        console.log(`🛒 Produto "${produto.nome}" (${quantidade}x) adicionado ao carrinho!`);
    }
};

/**
 * Altera a quantidade de um item específico já existente no carrinho,
 * validando o estoque atualizado.
 */
export const alterarQuantidadeCarrinho = (produtoId: number, novaQuantidade: number): void => {
    if (novaQuantidade <= 0) {
        throw new Error("Erro: A nova quantidade deve ser maior que zero. Utilize a remoção se deseja apagar o item.");
    }

    const produto = buscarProdutoPorId(produtoId);
    if (!produto) {
        throw new Error(`Erro: Produto com ID ${produtoId} não encontrado.`);
    }

    if (produto.estoque < novaQuantidade) {
        throw new Error(`Erro: Estoque insuficiente para "${produto.nome}". Disponível: ${produto.estoque}, Solicitado: ${novaQuantidade}.`);
    }

    const item = carrinho.find(i => i.produtoId === produtoId);
    if (!item) {
        throw new Error(`Erro: O produto com ID ${produtoId} não se encontra no carrinho.`);
    }

    item.quantidade = novaQuantidade;
    console.log(`🔄 Quantidade do produto "${produto.nome}" alterada para ${novaQuantidade}.`);
};

/**
 * Remove um item do carrinho utilizando findIndex e splice.
 */
export const removerDoCarrinho = (produtoId: number): void => {
    const index = carrinho.findIndex(item => item.produtoId === produtoId);
    if (index === -1) {
        throw new Error(`Erro: O produto com ID ${produtoId} não se encontra no carrinho.`);
    }

    const [itemRemovido] = carrinho.splice(index, 1);
    console.log(`🗑️ Item com ID ${produtoId} removido do carrinho.`);
};

/**
 * Calcula o valor total da compra somando os subtotais de cada item com .reduce().
 */
export const calcularTotalCarrinho = (): number => {
    return carrinho.reduce((acumulador, item) => {
        const subtotalItem = item.valorUnitario * item.quantidade;
        return acumulador + subtotalItem;
    }, 0);
};

