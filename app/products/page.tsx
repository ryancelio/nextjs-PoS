// import StorageTable from "../estoque/table";
// import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, getKeyValue} from "@nextui-org/react";

import ProdcutsTable from "../estoque/table";

export default function page(){
    return(
        <section className="grid gid-cols-12">
            <div className="col-span-12 m-4">
                <h1 className="text-3xl">Produtos</h1>
            </div>
            <div className="col-span-12">
                <ProdcutsTable />
            </div>
        </section>
    )
}
