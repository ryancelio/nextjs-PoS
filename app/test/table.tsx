'use client';

import { useCallback, useMemo, useState } from "react";
import { Autocomplete, AutocompleteItem, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Selection, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from "@nextui-org/react";
// import { placeholderMerc } from "./placeholderMercadoria";
import { placeholderFabrica, placeholderMercadoria } from "../lib/placeholders";
import React from "react";
import MercInfoSidebar from "./mercSidebar";
import clsx from "clsx";
import { ArchiveBoxIcon, ChevronDownIcon, FunnelIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Mercadoria, Categoria, Fabrica } from "../lib/types";
import Link from "next/link";
import {useAsyncList} from "@react-stately/data";
import { db } from "../lib/db";

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
        key: 'fabricaKey',
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
const statusOptions = [
    {
        id: "disponivel",
        name: "Disponível",
    },
    {
        id: "zerado",
        name: "Zerado",
    },
    {
        id: "naoVender",
        name: "Não Vender",
    },
]

export default function MercTable({mercadorias, categorias, fabricas}: 
    {
        mercadorias: Mercadoria[];
        categorias: Categoria[];
        fabricas: Fabrica[];
    }){

    
    const[mercToDisplay, setMercToDisplay] = useState(placeholderMercadoria);
    const[changedMerc,setChangedMerc] = useState(mercToDisplay);
    const[isLoading,setIsLoading] = useState(true);
    const[isOpen,setIsOpen] = useState(false);
    const[filterValue,setFilterValue] = useState("");
    const[sortDescriptor,setSortDescriptor] = useState<SortDescriptor>({
        column: "cod",
        direction: "ascending",
    })
    const[isAdvancedFilterOpen,setAdvancedFilterOpen] = useState(false);
    const[fabricaFilter,setFabricaFilter] = useState("");
    const[statusFilter,setStatusFilter] = useState<Selection>("all");
    const[page,setPage] = useState(1);
    const[rowsPerPage,setRowsPerPage] = useState(20);


    // const[statusFilter,setStatusFilter] = useState<Selection>("all");

    const hasSearchFilter = Boolean(filterValue);
    const hasFabricaFilter = Boolean(fabricaFilter)


    function getFabricaByKey(key: String | Number | Boolean | undefined) {
        if(key){
            return fabricas.find((fabrica) => fabrica.fabrica_key === key)
        }else{
            // throw new Error("Erro ao mostrar fabrica")
            // console.error("Erro ao mostrar Fabrica")
            return placeholderFabrica;
        }
    }
    const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) =>{
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    },[])

    function handleSelectionChange(key: any) {
        // console.log(key)
        let mercadoria = mercadorias.find((merc) => merc.mercadoria_key == key.currentKey);

        if(!mercadoria) {
            // throw new Error("Algo deu errado ao selecionar a mercadoria")
            setMercToDisplay(placeholderMercadoria)
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
            case 'fabricaKey':
                return(
                    <div>
                        {/* <p className="capitalize">{cellValue}</p> */}
                        <p>
                        {getFabricaByKey(cellValue)?.nomeFantasia}
                        </p>
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
        // setIsOpen(true)
        console.log(mercadorias.find((mercadoria) => mercadoria.mercadoria_key == key))
        
    }

    //-----------------------------------//
    //                                   //
    //            FILTERING              //
    //                                   //
    //-----------------------------------//

    //  Search Filtering
    //  Recebe a lista de mercadorias completa do banco de dados, e filtra
    const filteredMercadorias = useMemo(() =>{
        let filteredMercadorias = [...mercadorias];

        if(hasSearchFilter){
            filteredMercadorias = filteredMercadorias.filter((mercadoria) =>
            mercadoria.descricao?.toLowerCase().includes(filterValue.toLocaleLowerCase()),
        );
        }
        if(hasFabricaFilter){
            filteredMercadorias = filteredMercadorias.filter((mercadoria) =>
                // console.log(`Mercadoria: ${mercadoria.fabrica}`)
                // console.log(`Fabrica: ${fabricaFilter}`)
                mercadoria.fabricaKey == Number(fabricaFilter)
            )
        }
        //  Status Filter
        if(statusFilter != "all" && Array.from(statusFilter).length !== statusOptions.length){
            const filters = Array.from(statusFilter);

            // Filtra as mercadorias filtradas anteriormente
            filteredMercadorias = filteredMercadorias.filter((mercadoria) => {
                // Se o filtro "naoVender" nao estiver selecionado,
                // e naoVender da mercadoria for true
                // Ignora os outros filtros e remove a mercadoria da array
                if( !filters.includes("naoVender") && mercadoria.naoVender){
                    return false;
                }

                const disponivel = (filters.includes("disponivel") && mercadoria.estoqueTotal > 0);
                const zerado = (filters.includes("zerado") && mercadoria.estoqueTotal == 0);
                const naoVender = (filters.includes("naoVender") && mercadoria.naoVender);

                // Retorna a mercadoria no caso de qualquer um dos filtros forem verdadeiro
                return disponivel || zerado || naoVender
            });
        }
        return filteredMercadorias;
    },[mercadorias,filterValue,hasSearchFilter,fabricaFilter,hasFabricaFilter,statusFilter]);

    //  Sorting
    //  Recebe a lista filtrada de filteredMercadorias e permite ordenar (sort) elas de acordo com a coluna
    const list = useMemo(() =>{
        return [...filteredMercadorias].sort((a: Mercadoria,b: Mercadoria) =>{
            const first = a[sortDescriptor.column as keyof Mercadoria] as Number;
            const second = b[sortDescriptor.column as keyof Mercadoria] as Number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            setIsLoading(false)
            setPage(1);
            return sortDescriptor.direction === "descending" ? -cmp : cmp
        });
    },[sortDescriptor,filteredMercadorias]);

    //  Pagination
    //  Recebe a lista ordenada de list, e organiza ela em paginas
    const pages = Math.ceil(list.length / rowsPerPage);
    const paginatedItems = useMemo(() =>{
        const start = (page -1) * rowsPerPage;
        const end = start + rowsPerPage;

        return list.slice(start,end);
    },[list,page,rowsPerPage]);

    const onSearchChange = useCallback((value?:string) =>{
            if(value){
                setFilterValue(value);
                setPage(1);
            }else{
                setFilterValue("");
            }
        },[]);
    


    //|---------------------------------|
    //|         Top Content             |
    //|---------------------------------|
    const TopContent = useMemo(() =>{
        const onSelectionChange = (key: any) =>{
            const filteredFabrica = fabricas.find((fabrica) => fabrica.fabrica_key == key)
            // console.log(filteredFabrica)
            if(filteredFabrica){
                setFabricaFilter(filteredFabrica.fabrica_key)
            }else{
                setFabricaFilter("");
            }
        }
        return(
            <div>
                <div className="flex items-center">
                    {/* Left */}
                    <div className="mr-auto flex items-center gap-5">
                        {/* <div className="flex">
                            <ArchiveBoxIcon className="w-6" />
                            <p className="pl-3 text-lg">Estoque</p>
                        </div> */}
                        <div className="">
                            <Input 
                            isClearable
                            className="w-full h-fit sm:max-w-[44%] md:max-w-full"
                            placeholder="Pesquisar Mercadoria"
                            startContent={<MagnifyingGlassIcon className="w-6"/>}
                            value={filterValue}
                            onClear={() => setFilterValue("")}
                            onValueChange={onSearchChange}
                            />
                        </div>
                        <FunnelIcon title="Filtros Avançados" className="w-6 cursor-pointer hover:opacity-50" onClick={() =>setAdvancedFilterOpen(!isAdvancedFilterOpen)}/>
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
                
            {/* Advanced Filtering */}

                <div className={clsx("flex overflow-hidden transition-height ease-out",
                    {
                        "h-0" : !isAdvancedFilterOpen
                    },
                    {
                        "h-16 mt-4 border-b-1 border-gray-700" :isAdvancedFilterOpen
                    }
                )}>
                    <Autocomplete label="Fabrica" className="w-52 h-fit" size="sm" labelPlacement="inside" onSelectionChange={onSelectionChange}>
                                {fabricas.map((fabrica) =>(
                                    <AutocompleteItem key={fabrica.fabrica_key} value={fabrica.label}>
                                        {fabrica.nomeFantasia}
                                    </AutocompleteItem>
                                ))}
                    </Autocomplete>

                    <div className="">
                    <Dropdown>
                                <DropdownTrigger >
                                    <Button variant="flat" className="py-2 ml-3 h-12 text-md" endContent={<ChevronDownIcon className="text-medium w-4"/>} >
                                        Status
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                variant="flat"
                                disallowEmptySelection
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                                >
                                    {statusOptions.map((status) =>(
                                        <DropdownItem key={status.id}>
                                            {status.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                    </Dropdown>
                    </div>
                </div>
            </div>
        )
    },[filterValue,onSearchChange,setFilterValue,fabricas,isAdvancedFilterOpen,setStatusFilter,statusFilter]);

    const BottomContent = useMemo(() =>{
        
        return(
            <div className="flex">
                <div>
                    <label className="flex items-center text-default-400">Rows per page: 
                        <select 
                        className="bg-transparent outline-none"
                        onChange={onRowsPerPageChange}
                        >
                            <option value={20}>
                                20
                            </option>
                            <option value={30}>
                                30
                            </option>
                            <option value={40}>
                                40
                            </option>
                        </select>
                    </label>
                    
                </div>

                <div className="mr-auto ml-auto">
                <Pagination 
                isCompact
                showControls
                showShadow
                page={page}
                total={pages}
                onChange={setPage}
                />
                </div>
            </div>
        )
    },[setPage,pages,page,onRowsPerPageChange]);



    // |===============================|
    // |        Main Content           |
    // |===============================|
    return(
            <>
            {/* <ProductInfoOverlay /> */}

            <section className="grid grid-cols-12">
                {/* Tabela */}

                <div className="col-span-8">
                     <Table aria-label="Table"
                            isHeaderSticky
                            sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor} 
                            color="default" selectionMode="single"
                            selectionBehavior="replace"  
                            onSelectionChange={(key) => handleSelectionChange(key)}
                            className="z-10 p-4"
                            topContent={TopContent}
                            onRowAction={(key) => handleRowAction(key)}
                            classNames={{
                                base: "max-h-screen overflow-scroll",
                                table: ""
                            }}
                            bottomContent={BottomContent}
                         >
                         <TableHeader className="" columns={columns}>
                             {(column) =>
                                            <TableColumn    key={column.key} className="light:bg-black light:text-white" 
                                                            allowsSorting={(column.key === "descricao") || (column.key === "cod") || (column.key === "fabricaKey") ? true : false }
                                                            align={column.key === "descricao" ? "start" : "center"} >
                                                            {column.label}
                                            </TableColumn>
                            }
                         </TableHeader>
                         <TableBody items={paginatedItems}
                                    emptyContent={
                                                    <div>
                                                        <h1>Nenhuma Mercadoria</h1>
                                                        <p className="text-xs">Mude seus filtros e tente novamente</p>
                                                    </div>
                                                }
                                    isLoading={isLoading}
                                    loadingContent={
                                                    <div  className="grid place-items-center h-full w-full">
                                                        <Spinner label="loading..." />
                                                    </div>
                                                    } >
                             {(mercadoria: Mercadoria) => (
                                 <TableRow  key={mercadoria.mercadoria_key}>
                                     {(columnKey) => 
                                        <TableCell className={clsx("text-md",
                                            {
                                                'dark:bg-danger-200 bg-danger-500 first:rounded-l-lg last:rounded-r-lg' : mercadoria.estoqueTotal == 0
                                            },
                                            {
                                                'dark:bg-gray-800 bg-gray-500 text-neutral-700 first:rounded-l-lg last:rounded-r-lg data-[selected=true]:text-black' : mercadoria.naoVender
                                            }

                                        )}>
                                            {renderCell(mercadoria, columnKey)}
                                        </TableCell>}
                                 </TableRow>
                             )}
                         </TableBody>
                     </Table>
                </div>
                <MercInfoSidebar mercadoria={mercToDisplay} fabricaName={getFabricaByKey(mercToDisplay.fabricaKey)?.nomeFantasia}/>
            </section>
            </>
    )
    
    // function ProductInfoOverlay(){

    //     const [descValue, setDescValue] = useState(mercToDisplay.descricao);
    //     const [valorCompra, setValorCompra] = useState(mercToDisplay.valorCompra);
    //     const [valorVenda, setValorVenda] = useState(mercToDisplay.valorVenda);
  
        
    //     return(
    //         //    {Item Description Over}
    //         // Background Blur
    //         <div onClickCapture={() => setIsOpen(!isOpen)}
    //             className={clsx("fixed top-0 left-0 right-0 bottom-0 z-20 h-screen grid place-items-center w-screen",
    //             {
    //                 'block' : isOpen,
    //                 'hidden backdrop:hidden' : !isOpen,
    //             }
    //         )}>
    //         <div className={clsx("absolute bg-black w-screen h-screen bg-opacity-40 backdrop-blur-sm grid ")}>
    //         </div>

    //             {/* Window */}
    //             <div className={clsx("flex-1 drop-shadow-lg border-2 border-gray-300 dark:border-neutral-800 justify-center transition-all relative delay-100 ease-in h-3/4 w-3/4 dark:bg-gradient-to-b dark:bg-gray-900 bg-gray-200 rounded-lg",
    //                     {
    //                         'animate-[]' : isOpen,
    //                         'opacity-70' : !isOpen
    //                     }
    //             )}>
    //                 {/* Window TOP */}
    //                     <div className="relative grid grid-cols-12 m-4">
    //                         {/* <Textarea maxRows={1} variant="underlined" labelPlacement="outside" placeholder="ID" label="ID" className="col-span-1 text-center"/> */}
    //                         {/* COD Display */}
    //                         <div className="col-span-1">
    //                             <div className="text-center w-full">COD</div>
    //                             <input type="text" disabled value={mercToDisplay.cod} className="cursor-text w-full h-8 bg-transparent border-b-1 text-center disabled:border-b-0 outline-none" />
    //                         </div>
    //                         {/* Window Title */}
    //                         <h1 className="text-xl text-center col-span-10 my-3">Mercadoria</h1>
    //                         {/* Close Button */}
    //                         <XMarkIcon className="absolute m-2 right-0 cursor-pointer w-6 hover:opacity-50" onClick={() => setIsOpen(!isOpen)}/>
    //                     </div>

    //                     {/* Window Main */}
    //                     <div className="grid grid-cols-12 gap-4 lg:p-6 xl:p-10 xl:px-14">
    
    //                     {/* Descrição */}
    //                         <Textarea   maxRows={1} 
    //                                     variant="underlined" 
    //                                     labelPlacement="outside"
    //                                     label="Descrição"
    //                                     placeholder="Nome da Mercadoria"
    //                                     className="col-span-7"
    //                                     value={descValue}
    //                                     // onValueChange={(value) => {setChangedMerc((prev) => ({ ...prev, descricao: value }))}}
    //                                     onValueChange={setDescValue}
    //                                    />
    //                         {/* Fabrica */}
    //                         <Textarea  maxRows={1} variant="underlined" labelPlacement="outside" placeholder="Nome da Fabrica" label="Fabrica"
    //                                    className="col-span-3" />

    //                         {/* Categoria
    //                         <Autocomplete   label="Categoria" placeholder="Selecione a Categoria" 
    //                                         color="default" defaultItems={}
    //                                         className="col-span-2 mt-3"
    //                                         >
    //                             {(categorie) =><AutocompleteItem key={categorie.key}>{categorie.label}</AutocompleteItem>}
    //                         </Autocomplete> */}
    //                         {/* Valores */}
    //                         <div className="col-span-4">
    //                             <Textarea maxRows={1} variant="bordered" labelPlacement="outside-left" placeholder="00,00" label="Valor Custo"
    //                                         startContent={<span className="text-md">R$</span>}
    //                                         size="lg"
    //                                         value={mercToDisplay.valorCompra?.toFixed(2).toString()}
    //                                         onValueChange={() =>{}}
    //                                         isInvalid={false}
    //                                         className="ml-auto text-end items-center"
    //                             />

    //                         </div>
    //                     </div>
    //                 </div>
    //         </div>

    //     );
    // }
    
}


