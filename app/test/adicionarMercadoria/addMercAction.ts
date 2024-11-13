'use server';
import {number, string, z} from "zod"
import { MercadoriaSchema } from "@/app/lib/types";
import { toInternational } from "@/app/lib/internationalization";
import { db } from "@/app/lib/db";

export async function addFormMerc(prevState: {message:string}, formData: FormData){


    formData.set('valorCompra', toInternational(formData.get('valorCompra')));
    formData.set('valorVenda', toInternational(formData.get('valorVenda')));

    const parse = MercadoriaSchema.safeParse({
        cod: Number(formData.get('cod')),
        descricao: formData.get('descricao'),
        cor: formData.get('cor'),
        fabrica: formData.get('fabrica'),
        estoque02: Number(formData.get('estoque02')),
        estoque03: Number(formData.get('estoque03')),
        estoque04: Number(formData.get('estoque04')),
        estoqueTotal: Number(formData.get('total')),
        valorCompra: Number(formData.get('valorCompra')),
        valorVenda : Number(formData.get('valorVenda')),
        dataEntrada: formData.get('ultimaEntrada'),
        fabricaKey: Number(formData.get('fabricaKey')),
        categoriaKey: Number(formData.get('categoriaKey')),
        obs: formData.get("obs")
        // grupoKey: Number(formData.get("grupoKey")),
    })

    
    if(!parse.success){
        await new Promise((resolve) => setTimeout(resolve,2000))
        console.error(parse.error.message)
        return {...prevState,message: "Failed to create mercadoria!"}
    }
    const data = parse.data;


    try{
        await new Promise((resolve) => setTimeout(resolve,2000))
        console.log(data);
        // db('mercadorias').insert(data).catch((err) => {
        //     console.error(err);
        // })
        return({message: "Mercadoria created succesfully"})
    }catch(e){
        console.error(e)
        return({message: "Test Failed"})
    }
}