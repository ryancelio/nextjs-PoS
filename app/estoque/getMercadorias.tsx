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
        const categorias: Categoria[] = await db('categorias').select("*");

        //==================================================================//
        //                        Big Dataset Test                          //
        for(let i = 6;i < 10000; i++){
            let name = (Math.random() + 1).toString(36).substring(7);
            let estoqueTotal = Math.random() % 20
            mercadorias.push(
                {
                    descricao: name,
                    cod: i,
                    mercadoria_key: i.toString(),
                    fabricaKey: Math.floor(Math.random() * 5) + 1,
                    estoque02: Math.floor(Math.random() * 8),
                    estoque03: Math.floor(Math.random() * 8),
                    estoque04: 0,
                    estoqueTotal: 0,
                    valorVenda: Math.floor(Math.random() * 1000),
                    naoVender: (Math.random() < 0.001 ? true : false),
                    dataEntrada: (new Date().toString()),
                    valorCompra: Math.floor(Math.random() * 1000),
                }
            );
        }
        //==================================================================//


        //==================================================================//
        //                          Logging                                 //
        // console.log(mercadorias);
        //==================================================================//


        // Get Estoque Total from mercadorias, for mercadorias
        mercadorias.forEach((mercadoria) => {
            mercadoria.estoqueTotal = (mercadoria.estoque02 + mercadoria.estoque03 + mercadoria.estoque04);
            //@ts-ignore
            mercadoria.naoVender = mercadoria.naoVender == 0 ? false : true
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
