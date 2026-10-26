export type Categoria = "hardware" | "software" | "perifericos" | "moveis"

export type Produto = {
    id: number;
    nome: string;
    categoria: Categoria;
    preco: number;
    estoque: number;
}

export type Cliente = {
    id: number;
    nome: string;
    email: string;
}

export type CarrinhoItem = {
    produtoId: number;
    quantidade: number;
    valorUnitario: number;
}

export type Pedido = {
    id: number;
    clienteId: number;
    itens: CarrinhoItem[];
    valorTotal: number;
    data: Date;
    status: "CONCLUIDO" | "CANCELADO";
}

