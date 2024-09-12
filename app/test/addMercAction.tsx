'use server';

import { db } from "../lib/db";
import { Fabrica } from "../lib/types";

export async function addMercAction(formData: FormData): Promise<boolean>{

    try{
        // console.log(await db('categorias').select("*"));
        // console.log(formData);
        // const descricao = formData.get('descricao');
        // console.log(descricao);
        // console.log(formData.get('EstLj02'));

        // Couldn't make the estoque state have a default value of 0,
        // Gets a default value of "", so if it gets an "", turns it into a 0
        // TODO: Make the EstoqueInput have default value of 0
        if(!formData.get('EstLj02')){
            formData.set('EstLj02',"0");
        }
        if(!formData.get('EstLj03')){
            formData.set('EstLj03',"0");
        }
        if(!formData.get('EstLj04')){
            formData.set('EstLj04',"0");
        }

        // TODO
        // Make FormData get AutoComplete value directly
        const fabricas = await db('fabricas').select("*");
        if(formData.get("fabrica") != ""){
            formData.set("fabrica",fabricas.find((fabrica) => formData.get("fabrica") == fabrica.nomeFantasia).label);
        }


        console.log(formData)
        return false;
    }catch(error){
        return false;
    }

}
