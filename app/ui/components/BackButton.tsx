'use client';

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";


export default function BackButton(){
const router = useRouter();

return(
     <ArrowLeftIcon className="w-10 mx-2 py-2 cursor-pointer hover:opacity-50" onClick={router.back}/>
)

}
