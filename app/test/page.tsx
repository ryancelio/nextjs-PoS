import { Suspense } from "react";
import GetMercadorias from "../lib/getMercadorias";
import MercTable from "./table";
import { Skeleton } from "@heroui/react";
import TableSkeleton from "./tableSkeleton";


export default function TestPage(){
    

    return(
        <Suspense fallback={<TableSkeleton />}>
            <GetMercadorias />
        </Suspense>
    )
}
