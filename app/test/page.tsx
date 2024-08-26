import { Suspense } from "react";
import GetMercadorias from "../estoque/getMercadorias";
import MercTable from "./table";
import { Skeleton } from "@nextui-org/react";
import TableSkeleton from "./tableSkeleton";


export default function TestPage(){

    return(
            <GetMercadorias />
    )
}
