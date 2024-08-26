import { useState } from "react";
import Mercadoria from "../estoque/mercadoria";
import { Divider, Textarea } from "@nextui-org/react";

export default function MercInfoSidebar({mercadoria,}: {mercadoria: Mercadoria}){

    return(
        <div className="col-span-4 h-screen">
        <div className="flex-1 p-6 w-full h-full shadow-inner shadow-gray-400 dark:shadow-gray-900 
                        bg-gradient-radial from-gray-200 to-gray-300
                        dark:from-slate-700 dark:to-slate-800">
            {/* Top Container */}
            <div className="">
                <h1 className="text-center text-2xl">{mercadoria.descricao}</h1>
                <div className="text-lg flex justify-center items-center space-x-5">
                    <h1 className="">
                        {mercadoria.fabrica}
                    </h1>
                        <Divider orientation="vertical"className="px-2" />
                    <h1>
                        {mercadoria.categoria}
                    </h1>
                </div>
                <Divider className="mt-4"/>
            </div>
            {/* Main Container */}
            <div className="grid grid-cols-12 mt-6">
                {/* <Textarea className="col-span-6 text-right" 
                maxRows={1} label={<span className="text-lg">Valor Venda</span>} labelPlacement="outside-left"
                isReadOnly variant="faded" size="lg"
                value={mercadoria.valorVenda?.toFixed(2).toString()}
                /> */}
                    <div className="col-span-12 justify-center flex text-center text-2xl mt-1">
                    <h1 className="border-b-2 border-white hover:border-gray-400 w-fit">
                        <span className="pr-2 text-gray-400">Valor Venda:</span>
                        {`R$ ${mercadoria.valorVenda == 0 || undefined ? "----" : mercadoria.valorVenda?.toFixed(2)}`} 
                    </h1>
                    </div>
                    <div className="flex-1 col-span-12 justify-center mt-10 text-xl">
                        <h1 className="text-center hover:opacity-50"><span className="pr-2">Estoque Loja 02: </span>{mercadoria.estoque02}</h1>
                        <h1 className="text-center hover:opacity-50 pt-2"><span className="pr-2">Estoque Loja 03: </span>{mercadoria.estoque03}</h1>
                        <h1 className="text-center hover:opacity-50 pt-2"><span className="pr-2">Estoque Loja 04: </span>{mercadoria.estoque04}</h1>
                    </div>
            </div>
        </div>
    </div>
    )

}
