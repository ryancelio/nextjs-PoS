'use client';

import { Suspense, useState } from "react";
import MercadoriasTest from "../estoque/getMercadorias";
import UsersTest from "../estoque/getUsers";
import { Autocomplete, AutocompleteItem, Button, getKeyValue, Skeleton, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from "@nextui-org/react";
import Mercadoria from "../estoque/mercadoria";
import { placeholderMerc } from "./placeholderMercadoria";
import React from "react";
import MercInfoSidebar from "./mercSidebar";
import clsx from "clsx";
import { ArchiveBoxIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Categoria from "../estoque/categoria";
import Link from "next/link";

const columns = [
    {
        key: "cod",
        label: "COD",
    },
    {
        key: 'descricao',
        label: 'DESCRIÇÂO',
    },
    {
        key: 'fabrica',
        label: 'FÁBRICA',
    },
    {
        key: 'estoqueTotal',
        label: 'ESTOQUE',
    },
    {
        key: 'valorVenda',
        label: 'VALOR VENDA'
    }
]

export default function MercTable({mercadorias, categorias}: 
    {
        mercadorias: Mercadoria[];
        categorias: Categoria[];
    }){

    
    const[mercToDisplay, setMercToDisplay] = useState(placeholderMerc);
    const[changedMerc,setChangedMerc] = useState(mercToDisplay);
    const[isOpen,setIsOpen] = useState(false);

    function handleSelectionChange(key: any) {
        // console.log(key)
        let mercadoria = mercadorias.find((merc) => merc.key == key.currentKey);

        if(!mercadoria) {
            // throw new Error("Algo deu errado ao selecionar a mercadoria")
            setMercToDisplay(placeholderMerc)
        }else{
            setMercToDisplay(mercadoria);
        }
    }

    const renderCell = React.useCallback((mercadorias: Mercadoria, columnKey: React.Key) =>{
        const cellValue = mercadorias[columnKey as keyof Mercadoria];

        switch (columnKey){
            case 'cod':
                return(
                    <div>
                        <p>{cellValue}</p>
                    </div>
                );
            case 'descricao':
                return(
                    <div>
                        <p>{cellValue}</p>
                    </div>
                );
            case 'fabrica':
                return(
                    <div>
                        <p>{cellValue}</p>
                    </div>
                );
            case 'estoqueTotal':
                return(
                    <div>
                        <p>{cellValue}</p>
                    </div>
                );

            case "valorVenda" :
                return(
                    <div className="flex">
                        <span className="">R$ </span><p className="ml-auto">{cellValue == 0 ? "--" : Number(cellValue).toFixed(2)}</p>
                    </div>
                );
        }
    }, [])

    function handleRowAction(key: string | number | bigint): void {
        setIsOpen(true)
    }
    return(
            <>
            <ProductInfoOverlay />

            <section className="grid grid-cols-12">
                {/* Tabela */}

                <div className="col-span-8">
                     <Table aria-label="Table" isStriped color="primary" selectionMode="single" selectionBehavior="replace"  onSelectionChange={(key) => handleSelectionChange(key)}
                             className="z-10 p-4"
                             topContent={<TableTopContent />}
                             onRowAction={(key) => handleRowAction(key)}
                         >
                         <TableHeader className="" columns={columns}>
                             {(column) => <TableColumn key={column.key} className="light:bg-black light:text-white" align={column.key === "descricao" ? "start" : "center"} >{column.label}</TableColumn>}
                         </TableHeader>
                         <TableBody items={mercadorias} emptyContent={"No rows to display."}>
                             {(mercadoria) => (
                                 <TableRow  key={mercadoria.key}
                                 className={clsx("",
                                    {
                                        'dark:bg-danger-200 bg-danger-500' : mercadoria.estoqueTotal == 0
                                    },
                                    {
                                        'bg-gray-800 text-gray-100 text-opacity-45' : mercadoria.naoVender
                                    }
                                 )}
                                 >
                                     {(columnKey) => <TableCell className="text-md">{renderCell(mercadoria, columnKey)}</TableCell>}
                                 </TableRow>
                             )}
                         </TableBody>
                     </Table>
                </div>
                <MercInfoSidebar mercadoria={mercToDisplay} />
            </section>
            </>
    )

    function TableTopContent(){



        return(
            <div className="flex items-center">
                {/* Left */}
                <div className="flex mr-auto">
                    <ArchiveBoxIcon className="w-6" />
                    <p className="pl-3 text-lg">Estoque</p>
                </div>
                {/* Middle */}
                <div className="mr-auto ml-auto text-2xl font-semibold">
                    Célio Móveis
                </div>
                {/* Right */}
                <div className="ml-auto">
                    <Button as={Link} href="/test/adicionarMercadoria" color="success" ><PlusIcon className="w-5" /> Adicionar Merdacoria</Button>
                </div>
            </div>
        )
    }


    function ProductInfoOverlay(){

        const [descValue, setDescValue] = useState(mercToDisplay.descricao);
        const [valorCompra, setValorCompra] = useState(mercToDisplay.valorCompra);
        const [valorVenda, setValorVenda] = useState(mercToDisplay.valorVenda);
  

        return(
            //    {/* Item Description Over */}
            // Background Blur
            <div onClickCapture={() => setIsOpen(!isOpen)}
                className={clsx("fixed top-0 left-0 right-0 bottom-0 z-20 h-screen grid place-items-center w-screen",
                {
                    'block' : isOpen,
                    'hidden backdrop:hidden' : !isOpen,
                }
            )}>
            <div className={clsx("absolute bg-black w-screen h-screen bg-opacity-40 backdrop-blur-sm grid ")}>
            </div>

                {/* Window */}
                <div className={clsx("flex-1 drop-shadow-lg border-2 border-gray-300 dark:border-neutral-800 justify-center transition-all relative delay-100 ease-in h-3/4 w-3/4 dark:bg-gradient-to-b dark:bg-gray-900 bg-gray-200 rounded-lg",
                        {
                            'animate-[]' : isOpen,
                            'opacity-70' : !isOpen
                        }
                )}>
                    {/* Window TOP */}
                        <div className="relative grid grid-cols-12 m-4">
                            {/* <Textarea maxRows={1} variant="underlined" labelPlacement="outside" placeholder="ID" label="ID" className="col-span-1 text-center"/> */}
                            {/* COD Display */}
                            <div className="col-span-1">
                                <div className="text-center w-full">COD</div>
                                <input type="text" disabled value={mercToDisplay.cod} className="cursor-text w-full h-8 bg-transparent border-b-1 text-center disabled:border-b-0 outline-none" />
                            </div>
                            {/* Window Title */}
                            <h1 className="text-xl text-center col-span-10 my-3">Mercadoria</h1>
                            {/* Close Button */}
                            <XMarkIcon className="absolute m-2 right-0 cursor-pointer w-6 hover:opacity-50" onClick={() => setIsOpen(!isOpen)}/>
                        </div>

                        {/* Window Main */}
                        <div className="grid grid-cols-12 gap-4 lg:p-6 xl:p-10 xl:px-14">
    
                        {/* Descrição */}
                            <Textarea   maxRows={1} 
                                        variant="underlined" 
                                        labelPlacement="outside"
                                        label="Descrição"
                                        placeholder="Nome da Mercadoria"
                                        className="col-span-7"
                                        value={descValue}
                                        // onValueChange={(value) => {setChangedMerc((prev) => ({ ...prev, descricao: value }))}}
                                        onValueChange={setDescValue}
                                       />
                            {/* Fabrica */}
                            <Textarea  maxRows={1} variant="underlined" labelPlacement="outside" placeholder="Nome da Fabrica" label="Fabrica"
                                       className="col-span-3" />

                            {/* Categoria
                            <Autocomplete   label="Categoria" placeholder="Selecione a Categoria" 
                                            color="default" defaultItems={}
                                            className="col-span-2 mt-3"
                                            >
                                {(categorie) =><AutocompleteItem key={categorie.key}>{categorie.label}</AutocompleteItem>}
                            </Autocomplete> */}
                            {/* Valores */}
                            <div className="col-span-4">
                                <Textarea maxRows={1} variant="bordered" labelPlacement="outside-left" placeholder="00,00" label="Valor Custo"
                                            startContent={<span className="text-md">R$</span>}
                                            size="lg"
                                            value={mercToDisplay.valorCompra?.toFixed(2).toString()}
                                            onValueChange={() =>{}}
                                            isInvalid={false}
                                            className="ml-auto text-end items-center"
                                />

                            </div>
                        </div>
                    </div>
            </div>

        );
    }
    
}


