'use client';
import { Button, getKeyValue, Link, Skeleton, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import MercTable from "./table";
import { placeholderMerc } from "./placeholderMercadoria";
import Categoria from "../estoque/categoria";
import { rows, columns } from "../estoque/placeholderData";
import { ArchiveBoxIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const placeholderCategorie: Categoria[] = [{
    key: "1"
}
]

export default function TableSkeleton(){
    return(
            <div className="w-full h-full grid grid-cols-12">
                    <Table aria-label="Table" color="primary" selectionMode="single" selectionBehavior="replace"
                             className="z-10 p-4 col-span-8"
                             topContent={<TableTopContent />}
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
                    <Skeleton className="rounded-md">
                        <Button as={Link} href="/test/adicionarMercadoria" color="success" ><PlusIcon className="w-5" /> Adicionar Merdacoria</Button>
                    </Skeleton>
                </div>
            </div>
        )
    }
}
