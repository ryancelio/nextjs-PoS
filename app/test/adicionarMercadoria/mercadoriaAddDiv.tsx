'use server';
import { db } from "@/app/lib/db";
import AdicionarMercMain from "./ui/AdicionarMercMain";
import { Categoria,Fabrica,Mercadoria } from "@/app/lib/types";
import { placeholderMercadoria,placeholderCategoria,placeholderFabrica } from "@/app/lib/placeholders";



export default async function MercadoriaAddDiv(){

    try{
        const categorias = await db('categorias').select("*");
        const fabricas = await db('fabricas').select("*");
        
        return(
                <AdicionarMercMain categorias={categorias} fabricas={fabricas}/>
        )
    }catch(error){
        return(
            <AdicionarMercMain categorias={[placeholderCategoria]} fabricas={[placeholderFabrica]}/>
        )
    }
}
