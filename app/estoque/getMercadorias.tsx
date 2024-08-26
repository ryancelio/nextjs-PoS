'use server';

import { db } from "../lib/db";
import MercTable from "../test/table";
import Categoria from "./categoria";
import { categories } from "./placeholderData";
import Mercadoria from "./mercadoria";


export default async function GetMercadorias() {
    

    try{
        //==================================================================//
        //                            Testing                               //
        // await new Promise((resolve) => setTimeout(resolve,3000))         // Simulate server wait time
        // throw new Error("Test Error");                                   // Test error handling

        //==================================================================//

        
        const mercadorias: Mercadoria[] = await db('mercadorias').select("*");
        const categorias: Categoria[] = categories;
        console.log(mercadorias)

        mercadorias.forEach((mercadoria) => {
            mercadoria.estoqueTotal = (mercadoria.estoque02 + mercadoria.estoque03 + mercadoria.estoque04);
        });
        return(
            <MercTable mercadorias={mercadorias} categorias={categorias} />
        )
    }catch(error: any){
                 console.error('Error fetching mercadorias', error);

                 //Placeholder Mercadorias and categories with key for temp display
                 const mercadorias: Mercadoria[] = [{
                    key: "0",
                    estoque02: 0,
                    estoque03: 0,
                    estoque04: 0,
                    estoqueTotal: 0,
                 }]
                 const categories: Categoria[] = [{
                    key: '0',
                 }]
            return(
                <>
                    <div className="fixed z-40 h-screen w-screen opacity-70 bg-neutral-600">
                    </div>
                    <div className="text-white fixed flex-1 shadow-2xl rounded-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2/4 h-1/4 bg-neutral-700 z-50
                                    ">
                         <div className=" w-full text-center rounded-t-lg text-lg bg-red-600 p-2">
                            <h1 className=" text-5xl rounded-lg font-semibold">ERRO</h1>
                         </div>
                         <div className="grid place-items-center mt-5">
                            <h1 className="text-2xl mb-1 font-semibold">Ocorreu um erro ao receber dados do servidor.</h1>
                            <p className="text-lg">Espere um momento e tente recarregar a página</p>
                            <p className="text-md mt-8">Se o erro persistir, entre em contato com o admnistrador do sistema e fornça o seguinte erro:</p>
                            <p>{error.toString()}</p>
                         </div>
                    </div>
                    <MercTable mercadorias={mercadorias} categorias={categories}/>
                </>
            )
    }

}
