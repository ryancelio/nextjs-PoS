'use server';
import { db } from "@/app/lib/db";
import AdicionarMercMain from "./ui/AdicionarMercMain";
import { placeholderCategoria,placeholderFabrica, placeholderGrupo } from "@/app/lib/placeholders";



export default async function MercadoriaAddDiv(){

    try{
        const fabricas = await db('fabricas').select("*");
        const categorias = await db('categorias').select("*");
        const grupos = await db('grupos').select("*");

        return(
                <AdicionarMercMain categorias={categorias} fabricas={fabricas} grupos={grupos}/>
        )
    }catch(error){
        return(
            <AdicionarMercMain categorias={[placeholderCategoria]} fabricas={[placeholderFabrica]} grupos={[placeholderGrupo]}/>
        )
    }
}
