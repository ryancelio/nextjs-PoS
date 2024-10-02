import { Autocomplete, AutocompleteItem, Textarea } from "@nextui-org/react";
import TopBar from "./TopBar";
import { db } from "@/app/lib/db";
import { useEffect, useState } from "react";
import { Categoria } from "@/app/lib/types";
import MercadoriaAddDiv from "./mercadoriaAddDiv";


export default function Page(){


    return(
        <section className="flex-col dark:bg-zinc-900 h-screen w-full">
            <div className="w-full h-[8%]">
                <TopBar />
            </div>
            <div className="flex-grow h-[92%] pb-10">
                <MercadoriaAddDiv/>
            </div>
        </section>
    )
}
