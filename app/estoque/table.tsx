
'use client';

import React, { useMemo, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/table";
import {rows, categories} from "./placeholderData";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Autocomplete, AutocompleteItem, Divider, Pagination, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Mercadoria } from "../lib/types";
import { placeholderMercadoria } from "../lib/placeholders";

const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: 'descricao',
        label: 'Descrição',
    },
    {
        key: 'fabrica',
        label: 'Fábrica',
    },
    {
        key: 'estoqueTotal',
        label: 'Estoque',
    },
    {
        key: 'valorVenda',
        label: 'Valor Venda'
    }
]
const BigRows: Mercadoria[] = [placeholderMercadoria];
for(let i = 6;i < 2000; i++){
    let r = (Math.random() + 1).toString(36).substring(7);
    BigRows.push(
        {
            descricao: r,
            cod: i,
            mercadoria_key: i.toString(),
            estoque02: 0,
            estoque03: 0,
            estoque04: 0,
            estoqueTotal: 0,
        }
    );
}
const placeholderObj = {
    key: '0',
    id: '1',
    description: 'PLACEHOLDER DESC',
    fabrica: 'PLACEHOLDER FABRICA',
    estoque: 0,
    valorCompra: "1000.00",
}

export default function ProdcutsTable(){
        const [isOpen, setIsOpen] = React.useState(false);
        const [descValue,setDescValue] = React.useState(placeholderObj.description)
        const [codValue,setCodValue] = React.useState(placeholderObj.key)
        const [valorCompra, setValorCompra] = React.useState(placeholderObj.valorCompra)
    
    function handleRowAction(key: number | string | bigint){
        let selectedProduct = rows.filter((obj) =>{return obj.key === key})
        // console.log(selectedProduct[0]);
        setDescValue(selectedProduct[0].description);
        setCodValue(selectedProduct[0].key);
        setIsOpen(true);
        
    }
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    
    const pages = Math.ceil(BigRows.length / rowsPerPage);

    const items = useMemo( () =>{
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return BigRows.slice(start,end);
    },[page,BigRows])

    return(
        <>
            <ProductInfo />

            {/* Estoque Table */}
            <Table aria-label="Table" isStriped selectionMode="single" selectionBehavior="replace" onRowAction={(key) => handleRowAction(key)}
                    className="z-10 p-4"
                    classNames={
                        {
                            base: 'max-h-screen overflow-scroll'
                        }
                    }
                    bottomContent={
                        <div>
                            <Pagination 
                            isCompact
                            showControls
                            showShadow
                            onChange={(page) => setPage(page)}
                            total={pages}
                            page={page}
                            />
                        </div>
                    }
                >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={items} emptyContent={"No rows to display."}>
                    {(item) => (
                        <TableRow   key={item.mercadoria_key}
                        className=""
                        >
                            {(columnKey) => <TableCell className="">{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );

    function ProductInfo(){
        return(
            //    {/* Item Description Over */}
            // Background Blur
            <div className={clsx("transition-all ease-out fixed bg-black w-screen h-screen z-20 top-0 left-0 right-0 bottom-0 bg-opacity-40 backdrop-blur-sm grid place-items-center",
                        {
                            'block' : isOpen,
                            'hidden backdrop:hidden' : !isOpen,
                        }
            )}>
                {/* Window */}
                <div className={clsx("flex-1 justify-center transition-all delay-100 ease-in h-3/4 w-3/4 dark:bg-gradient-to-b dark:bg-gray-900 bg-gray-200 rounded-lg opacity-90 z-30",
                        {
                            'translate-y-0' : isOpen,
                            '-translate-y-1/2 ' : !isOpen
                        }
                )}>
                    {/* Window TOP */}
                        <div className="relative grid grid-cols-12 m-4">
                            {/* <Textarea maxRows={1} variant="underlined" labelPlacement="outside" placeholder="ID" label="ID" className="col-span-1 text-center"/> */}
                            {/* COD Display */}
                            <div className="col-span-1">
                                <div className="text-center w-full">COD</div>
                                <input type="text" disabled value={codValue} className="cursor-text w-full h-8 bg-transparent border-b-1 text-center disabled:border-b-0 outline-none" />
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
                                        onValueChange={setDescValue}
                                       />
                            {/* Fabrica */}
                            <Textarea  maxRows={1} variant="underlined" labelPlacement="outside" placeholder="Nome da Fabrica" label="Fabrica"
                                       className="col-span-3" />

                            {/* Categoria */}
                            <Autocomplete   label="Categoria" placeholder="Selecione a Categoria" 
                                            color="default" defaultItems={categories}
                                            className="col-span-2 mt-3"
                                            >
                                {(categorie) =><AutocompleteItem key={categorie.key}>{categorie.label}</AutocompleteItem>}
                            </Autocomplete>
                            {/* Valores */}
                            <div className="col-span-4">
                                <Textarea maxRows={1} variant="bordered" labelPlacement="outside-left" placeholder="00,00" label="Valor Custo"
                                            startContent={<span className="text-md">R$</span>}
                                            size="lg"
                                            value={valorCompra}
                                            onValueChange={setValorCompra}
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
