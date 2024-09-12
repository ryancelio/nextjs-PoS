export interface Mercadoria {
    key : string;
    cod?: number;
    descricao?: string;
    fabrica?: string;
    estoqueTotal: number;
    estoque02 : number;
    estoque03 : number;
    estoque04 : number;
    categoria?: string;
    localizacao?: string;
    valorCompra?: number;
    valorVenda?: number;
    ultimaModificacao?: string;
    dataEntrada?: string;
    observacoes?: string;
    naoVender?: boolean;
}
export interface Categoria {
    key: string;
    name?: string;
}
export interface Fabrica {
    key: string;
    label: string;
    nomeFantasia: string;
}
