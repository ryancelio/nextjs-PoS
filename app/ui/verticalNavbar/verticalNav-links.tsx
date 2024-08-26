'use client';

import { ArchiveBoxIcon, ChartBarIcon, ShoppingBagIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Button, Link } from "@nextui-org/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import {SidebarContext} from './sidebarOpenContext';

const links = [
    {
        name: "Dashboard",
        href: '/',
        icon: ChartBarIcon
    },
    {
        name: "Estoque",
        href: '/products',
        icon: ArchiveBoxIcon
    },
    {
        name: "Vendas",
        href: "/test",
        icon: ShoppingBagIcon
    },
    {
        name: "Clientes",
        href: '#',
        icon: UserGroupIcon
    },
    {
        name: "Vendedores",
        href: '#',
        icon: UsersIcon
    }
]

export default function VerticalNavLinks(){
    
    let sidebarOpen = useContext(SidebarContext);
    
    const pathname = usePathname();
    
    return(
        <div className="">
            <ul className="flex flex-col gap-3">
            {links.map((link =>{
                return(
                    <li key={link.name} className="w-full text-center items-center px-3">
                        <Link href={link.href}
                              className={clsx("transition-all ease-out p-2 w-full bg-transparent rounded-lg h-fit text-xl hover:bg-primary-100",
                                {
                                    'bg-primary-500 hover:bg-primary-500 text-white dark:text-black' : link.href === pathname
                                },
                                {
                                    'justify-center' : !sidebarOpen
                                },
                                {
                                    'justify-start' : sidebarOpen
                                }
                                
                              )}
                        >
                            {<link.icon className={clsx("w-8",
                                {
                                    'mr-2' : sidebarOpen
                                }
                            )} />}
                            <span className={clsx("",
                                {
                                    'block' : sidebarOpen
                                },
                                {
                                    'hidden' :!sidebarOpen
                                }
                            )}>{link.name}</span>
                        </Link>
                    </li>
                )
            }))}
            </ul>
        </div>
    )


}
