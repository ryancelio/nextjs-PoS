'use client';
import { Button, getKeyValue, Input, Link, Skeleton, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import MercTable from "./table";
import { placeholderMercadoria } from "../lib/placeholders";
import { Categoria } from "../lib/types";
import { rows, columns } from "../estoque/placeholderData";
import { ArchiveBoxIcon, FunnelIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";


export default function TableSkeleton(){

    return(
            <div className="w-full h-full grid grid-cols-12">
                    <Table aria-label="Table" color="primary" selectionMode="single" selectionBehavior="replace"
                             className="z-10 p-4 col-span-8"
                             isHeaderSticky
                             topContent={<TableTopContent />}
                             classNames={{
                                base: "max-h-screen overflow-scroll",
                                table: ""
                            }}
                         >
                         <TableHeader className="" columns={columns}>
                             {(column) => <TableColumn key={column.key} className="light:bg-black light:text-white" align={column.key === "descricao" ? "start" : "center"} >{column.label}</TableColumn>}
                         </TableHeader>
                         <TableBody items={rows} emptyContent={"No rows to display."}>
                             {(row) => (
                                 <TableRow  key={row.key}
                                 >
                                     {(columnKey) => <TableCell className="text-md">{<Skeleton className="w-full rounded-md h-8">{getKeyValue(row, columnKey)}</ Skeleton>}</TableCell>}
                                 </TableRow>
                             )}
                         </TableBody>
                     </Table>
                    
                    <div className="col-span-4 grid place-items-center w-full h-full shadow-inner shadow-gray-400 dark:shadow-gray-900 
                        bg-gradient-radial from-gray-200 to-gray-300
                        dark:from-slate-700 dark:to-slate-800">
                            <Spinner className="w-20" size="lg"/>
                    </div>
            </div>

    )
    function TableTopContent(){



        return(
            <div>
            <div className="flex items-center">
                {/* Left */}
                <div className="mr-auto flex items-center gap-5">
                    {/* <div className="flex">
                        <ArchiveBoxIcon className="w-6" />
                        <p className="pl-3 text-lg">Estoque</p>
                    </div> */}
                    <Skeleton className="rounded-xl h-10 w-fit">
                    <div className="">
                        <Input 
                        isClearable
                        className="w-full h-fit sm:max-w-[44%] md:max-w-full"
                        placeholder="Pesquisar Mercadoria"
                        startContent={<MagnifyingGlassIcon className="w-6"/>}
                        />
                    </div>
                    <div>
                        <FunnelIcon title="Filtros Avançados" className="w-6 cursor-pointer hover:opacity-50"/>
                    </div>
                    </Skeleton>
                </div>
                {/* Middle */}
                <div className="mr-auto ml-auto text-2xl font-semibold">
                    Célio Móveis
                </div>
                {/* Right */}
                <div className="ml-auto">
                    <Skeleton className="rounded-xl">
                        <Button color="success" ><PlusIcon className="w-5" /> Adicionar Merdacoria</Button>
                    </Skeleton>
                </div>
            </div>
            </div>
        )
    }
}
