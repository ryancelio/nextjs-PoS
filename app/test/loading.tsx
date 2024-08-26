import { Spinner } from "@nextui-org/react";
import TableSkeleton from "./tableSkeleton";


export default function Loading(){

    return(
        // <div className="w-full h-full grid place-items-center">
        //     <Spinner size="lg" />
        // </div>
        <TableSkeleton />
    )
}
