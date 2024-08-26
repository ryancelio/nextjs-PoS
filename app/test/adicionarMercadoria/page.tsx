'use client;'

import { Autocomplete, AutocompleteItem, Textarea } from "@nextui-org/react";
import TopBar from "./TopBar";
import { db } from "@/app/lib/db";
import { useEffect, useState } from "react";
import Categoria from "@/app/estoque/categoria";
import MercadoriaAddDiv from "./mercadoriaAddDiv";


const placeholderCategoria: Categoria[] = [
    {
        key: '0',
        name: 'categoria'
    }
]


export default function Page(){

    return(
        <section>
            <TopBar />
            <div>
                <MercadoriaAddDiv />
            </div>
        </section>
    )
}
