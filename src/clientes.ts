import type { Cliente } from "./types.js";

export let clientes: Cliente[] = [
    { id: 1, nome: "Ana Luiza", email: "ana.luiza@email.com" },
    { id: 2, nome: "Carlos Eduardo", email: "carlos.eduardo@email.com" },
    { id: 3, nome: "Camila Silva", email: "camila.silva@email.com" },
    { id: 4, nome: "Miguel Souza", email: "miguel.souza@email.com" },
    { id: 5, nome: "Isabela Caetano", email: "isabela.caetano@email.com" }
];

/**
 * Retorna todos os clientes cadastrados.
 */
export const listarClientes = (): Cliente[] => {
    return clientes;
};

/**
 * Busca um cliente pelo seu ID único.
 * @returns O cliente encontrado ou undefined caso não exista.
 */
export const buscarClientePorId = (id: number): Cliente | undefined => {
    return clientes.find(cliente => cliente.id === id);
};

/**
 * Cadastra um novo cliente com validações de obrigatoriedade e unicidade (ID e E-mail).
 * @throws Error se nome/email estiverem vazios, ou se o ID/E-mail já existirem.
 */
export const adicionarCliente = (novoCliente: Cliente): void => {
    // 1. Validação de preenchimento dos campos obrigatórios
    if (!novoCliente.nome || novoCliente.nome.trim() === "") {
        throw new Error("Erro: O nome do cliente não pode estar vazio.");
    }
    if (!novoCliente.email || novoCliente.email.trim() === "") {
        throw new Error("Erro: O e-mail do cliente não pode estar vazio.");
    }

    // 2. Validação de Unicidade do ID
    const clienteExistentePorId = buscarClientePorId(novoCliente.id);
    if (clienteExistentePorId) {
        throw new Error(`Erro: Já existe um cliente cadastrado com o ID ${novoCliente.id}.`);
    }

    // 3. Validação de Unicidade do E-mail (case-insensitive)
    const emailExistente = clientes.some(
        cliente => cliente.email.toLowerCase() === novoCliente.email.trim().toLowerCase()
    );
    if (emailExistente) {
        throw new Error(`Erro: O e-mail "${novoCliente.email}" já está cadastrado no sistema.`);
    }

    // 4. Inserção no Array
    clientes.push(novoCliente);
    console.log(`✅ Cliente "${novoCliente.nome}" cadastrado com sucesso!`);
};

/**
 * Retorna uma lista formatada apenas com os e-mails dos clientes (Uso do map).
 */
export const listarEmailsClientes = (): string[] => {
    return clientes.map(cliente => cliente.email);
};