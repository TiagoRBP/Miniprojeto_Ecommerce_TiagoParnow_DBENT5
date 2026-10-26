import { buscarClientePorId } from "./clientes.js";
import { listarCarrinho, calcularTotalCarrinho, limparCarrinho } from "./carrinho.js";
import { buscarProdutoPorId } from "./produtos.js";
import type { Pedido, CarrinhoItem } from "./types.js";

let pedidos: Pedido[] = [];
let proximoPedidoId = 1;

/**
 * Retorna todos os pedidos registrados no sistema.
 */
export const listarPedidos = (): Pedido[] => pedidos;

/**
 * Busca um pedido específico pelo seu ID único.
 */
export const buscarPedidoPorId = (id: number): Pedido | undefined => {
    return pedidos.find(pedido => pedido.id === id);
};

/**
 * Busca todos os pedidos associados a um cliente específico.
 */
export const buscarPedidosPorCliente = (clienteId: number): Pedido[] => {
    return pedidos.filter(pedido => pedido .clienteId === clienteId);
};

/**
 * Finaliza a compra do carrinho atual para o cliente informado,
 * descontando o estoque dos produtos e limpando o carrinho.
 */
export const finalizarPedido = (clienteId: number): Pedido => {
    // 1. Validação de Cliente
    const cliente = buscarClientePorId(clienteId);
    if (!cliente) {
        throw new Error(`Erro: Cliente com ID ${clienteId} não foi encontrado.`);
    }

    // 2. Validação de Carrinho Vazio
    const itensCarrinho = listarCarrinho();
    if (itensCarrinho.length === 0) {
        throw new Error("Erro: Não é possível finalizar um pedido com o carrinho vazio.");
    }

    // 3. Validação de Estoque e Baixa Definitiva
    for (const item of itensCarrinho) {
        const produto = buscarProdutoPorId(item.produtoId);
        if (!produto) {
            throw new Error(`Erro: Produto com ID ${item.produtoId} não encontrado no catálogo.`);
        }
        if (produto.estoque < item.quantidade) {
            throw new Error(`Erro: Estoque insuficiente para "${produto.nome}". Disponível: ${produto.estoque}, Solicitado: ${item.quantidade}.`);
        }
    }

    // Com a validação aprovada, efetua a baixa real no estoque
    for (const item of itensCarrinho) {
        const produto = buscarProdutoPorId(item.produtoId)!;
        produto.estoque -= item.quantidade;
    }

    // 4. Criação e Registro do Pedido
    const novoPedido: Pedido = {
        id: proximoPedidoId++,
        clienteId,
        itens: [...itensCarrinho], // Clona os itens do carrinho
        valorTotal: calcularTotalCarrinho(),
        data: new Date(),
        status: "CONCLUIDO"
    };

    pedidos.push(novoPedido);

    // 5. Limpeza do Carrinho
    limparCarrinho();

    console.log(`✅ Pedido #${novoPedido.id} finalizado com sucesso para o cliente "${cliente.nome}"! Total: R$ ${novoPedido.valorTotal.toFixed(2)}`);

    return novoPedido;
};

