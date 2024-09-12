'use server';

import { db } from "../lib/db";
import MercTable from "../test/table";
import ErrorDisplayOver from "../ui/components/Error";
import { useAsyncList } from "@react-stately/data";
import {Categoria, Fabrica, Mercadoria} from "../lib/types"
import { placeholderFabrica,placeholderCategoria,placeholderMercadoria } from "../lib/placeholders";

export default async function GetMercadorias(){

    try{
        //==================================================================//
        //                            Testing                               //
        // await new Promise((resolve) => setTimeout(resolve,3000))         // Simulate server wait time
        // throw new Error("Test Error");                                   // Test error handling
        //==================================================================//

        
        const mercadorias: Mercadoria[] = await db('mercadorias').select("*");
        const fabricas: Fabrica[] = await db('fabricas').select("*");
        const categorias: Categoria[] = [placeholderCategoria];

        mercadorias.forEach((mercadoria) => {
            mercadoria.estoqueTotal = (mercadoria.estoque02 + mercadoria.estoque03 + mercadoria.estoque04);
        });
        return(
            <MercTable mercadorias={mercadorias} categorias={categorias} fabricas={fabricas}/>
        )
    }catch(error: any){
                 console.error('Error fetching mercadorias', error);

            return(
                <>
                    <ErrorDisplayOver   error={error}
                                        errorName="Ocorreu um erro ao receber dados do servidor."
                                        errorDesc="Espere um momento e tente recarregar a página"
                                        />

                    <MercTable mercadorias={[placeholderMercadoria]} categorias={[placeholderCategoria]} fabricas={[placeholderFabrica]}/>
                </>
            );
    }

}
