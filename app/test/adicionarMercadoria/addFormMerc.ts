'use server';
import {number, z} from "zod"
import { MercadoriaSchema } from "@/app/lib/types";
import { toInternational } from "@/app/lib/internationalization";

export async function addFormMerc(prevState: {message:string}, formData: FormData){
    // formData.set('descricao',"C TA DOIDO?");
    //@ts-ignore
    formData.set('valorCompra', toInternational(formData.get('valorCompra')));

    const parse = MercadoriaSchema.safeParse({
        mercadoria_key: "test",
        cod: 0,
        descricao: formData.get('descricao'),
        cor: formData.get('cor'),
        fabrica: formData.get('fabrica'),
        estoque02: Number(formData.get('estoque02')),
        estoque03: Number(formData.get('estoque03')),
        estoque04: Number(formData.get('estoque04')),
        estoqueTotal: Number(formData.get('total')),
        valorCompra: Number(formData.get('valorCompra')),
        dataEntrada: formData.get('ultimaEntrada')
    })


    if(!parse.success){
        console.error(parse.error)
        return {message: "Failed to create mercadoria!"}
    }
    const data = parse.data;


    try{
        console.log(data);
        return({message: "Test Success"})
    }catch(e){
        console.error(e)
        return({message: "Test Failed"})
    }
}