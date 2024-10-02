'use client';

import BackButton from "@/app/ui/components/BackButton";
import { HomeIcon } from "@heroicons/react/24/outline";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";


export default function TopBar(){


    return(
        <section className="w-full h-fit">
            {/* Topbar */}
            <div className="flex-1 dark:bg-slate-800 border-b-1 w-full h-fit shadow-md p-1 items-center">
                <div className="flex h-fit items-center">
                    {/* Left */}
                    <div className="mr-auto">
                        <BackButton />
                    </div>
                    {/* Middle */}
                    <div className="mr-auto text-center ml-auto text-lg items-center h-full">
                        <h1 className="text-xl opacity-70">Adicionar Mercadoria</h1>
                    </div>
                    {/* Right */}
                    <div className="ml-auto">

                    </div>
                </div>
                <div className="w-full h-fit px-5 py-2">
                    <Breadcrumbs size="lg">
                        <BreadcrumbItem href="/"><HomeIcon className="w-5"/>Home</BreadcrumbItem>
                        <BreadcrumbItem href="/test">Produtos</BreadcrumbItem>
                        <BreadcrumbItem href="/test/adicionarMercadoria">Adicionar Mercadoria</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
            </div>
            
        </section>
    )
}
