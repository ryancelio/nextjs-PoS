export interface Mercadoria {
    mercadoria_key : string;
    cod?: number;
    descricao?: string;
    cor?: string;
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
    fabricaKey?: number;
    categoriaKey?: number;
}
export interface Categoria {
    categoria_key: string;
    label?: string;
    name?: string;
}
export interface Fabrica {
    fabrica_key: string;
    label: string;
    nomeFantasia: string;
}
