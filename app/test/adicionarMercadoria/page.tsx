import { Autocomplete, AutocompleteItem, Textarea } from "@nextui-org/react";
import TopBar from "./TopBar";
import { db } from "@/app/lib/db";
import { useEffect, useState } from "react";
import { Categoria } from "@/app/lib/types";
import MercadoriaAddDiv from "./mercadoriaAddDiv";


export default function Page(){


    return(
        <section className="dark:bg-zinc-900 h-screen w-full">
            <TopBar />
            <div className="">
                <MercadoriaAddDiv/>
            </div>
        </section>
    )
}
