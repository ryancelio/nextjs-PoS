import {z} from "zod"

export const MercadoriaSchema = z.object({
    mercadoria_key: z.string(),
    cod: z.number(),
    descricao: z.string(),
    cor: z.string().optional(),
    fabrica: z.string().optional(),
    estoqueTotal: z.number(),
    estoque02: z.number(),
    estoque03: z.number(),
    estoque04: z.number(),
    categoria: z.string().optional(),
    localizacao: z.string().optional(),
    valorCompra: z.number(),
    valorVenda: z.number().optional(),
    ultimaModificacao: z.string().optional(),
    dataEntrada: z.string(),
    observacoes: z.string().optional(),
    naoVender: z.boolean().optional(),
    fabricaKey: z.number().optional(),
    categoriaKey: z.number().optional(),
})

export type Mercadoria = z.infer<typeof MercadoriaSchema>;

// export interface Mercadoria {
//     mercadoria_key : string;
//     cod?: number;
//     descricao?: string;
//     cor?: string;
//     fabrica?: string;
//     estoqueTotal: number;
//     estoque02 : number;
//     estoque03 : number;
//     estoque04 : number;
//     categoria?: string;
//     localizacao?: string;
//     valorCompra?: number;
//     valorVenda?: number;
//     ultimaModificacao?: string;
//     dataEntrada?: string;
//     observacoes?: string;
//     naoVender?: boolean;
//     fabricaKey?: number;
//     categoriaKey?: number;
// }

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
