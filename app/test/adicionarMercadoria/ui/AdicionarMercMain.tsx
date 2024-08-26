'use client';
import Categoria from "@/app/estoque/categoria";
import { db } from "@/app/lib/db";
import { Autocomplete, AutocompleteItem, Textarea } from "@nextui-org/react";



export default function AdicionarMercMain({categorias,}:
    {
        categorias: Categoria[]
    },
){

    return(
        <div className="p-10 grid grid-cols-12 place-items-center gap-10 justify-center items-center">
            <Textarea 
            label="Descricao"
            labelPlacement="inside"
            minRows={1} maxRows={2}
            size="lg"
            variant="underlined"
            className="col-span-6 h-fit text-large"
            />
            <Autocomplete variant="faded" label="Categoria" className="col-span-3" size="lg">
                {categorias.map((categoria) =>(
                    <AutocompleteItem key={categoria.key} value={categoria.name}>
                        {categoria.name}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
    </div>
    )

    
}
