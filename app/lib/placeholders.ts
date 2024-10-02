import { Categoria, Fabrica, Grupo, Mercadoria } from "./types";

export const placeholderMercadoria: Mercadoria = {
    mercadoria_key: "0",
    fabricaKey: 0,
    categoriaKey: 0,
    estoque02: 0,
    estoque03: 0,
    estoque04: 0,
    estoqueTotal: 0,
    cod: 1,
    dataEntrada: Date.now().toString(),
    descricao: "Mercadoria",
    valorCompra: 0,
    categoria: "Categoria",
    cor: "Cor",
    fabrica: "Fabrica",
}
export const placeholderCategoria: Categoria = {
    categoria_key: "0",
    name: "Categoria",
    grupo_key: "1",
    label: "categoria"
}
export const placeholderFabrica: Fabrica = {
    fabrica_key: "0",
    label: "fabrica",
    nomeFantasia: "Fabrica"
}
export const placeholderGrupo: Grupo = {
    grupo_key: "0",
    label: "grupo",
    name: "Grupo",
}