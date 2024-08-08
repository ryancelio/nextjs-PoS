import { XMarkIcon } from "@heroicons/react/24/outline";
import { Textarea } from "@nextui-org/react";
import clsx from "clsx";
import { useState } from "react";


export default function ProductInfo({product,}:{
    product:{
        key: number | string | bigint;
        description: string;
        fabrica: string;
        estoque: number;
        valorVenda?: number;
        valorCompra?: number;
    }
}){
    const [descValue, setDescValue] = useState(product.description);
    
    return(
<>
</>
    )
}
