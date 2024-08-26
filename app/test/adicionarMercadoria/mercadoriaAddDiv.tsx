import { Autocomplete, AutocompleteItem, Textarea } from "@nextui-org/react";
import { db } from "@/app/lib/db";
import { useEffect, useState } from "react";
import Categoria from "@/app/estoque/categoria";
import GetSelectCategory from "./ui/AdicionarMercMain";
import AdicionarMercMain from "./ui/AdicionarMercMain";


const placeholderCategoria: Categoria[] = [
    {
        key: '0',
        name: 'categoria'
    }
]


export default async function MercadoriaAddDiv(){

    try{
        const categorias = await db('categorias').select("*");
        
        return(
            <AdicionarMercMain categorias={categorias} />
        )
    }catch(error){
        return(
            <AdicionarMercMain categorias={placeholderCategoria}/>
        )
    }
}
