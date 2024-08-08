'use client';

import { ArrowRightIcon, PowerIcon } from "@heroicons/react/24/outline";
import VerticalNavLinks from "./verticalNav-links";
import { Button } from "@nextui-org/react";
import { useContext, useState } from "react";
import clsx from "clsx";
import { SidebarContext } from "./sidebarOpenContext";
import { ThemeSwitcher } from "../ThemeSwitcher";

export default function VerticalNavbar(){
    let isSidebarOpen = useContext(SidebarContext);

    const[sidebarOpen, setSidebarOpen] = useState(false);



    return(
        // {/* Provides a constantly updated variable to the child */}
        <SidebarContext.Provider value={ sidebarOpen }>
        <section className={clsx("h-screen overflow-hidden transition-all ease-out bg-gradient-to-b from-white to-gray-50 shadow-lg dark:from-slate-700 dark:to-slate-800 z-50 items-center flex-col flex",
                                {
                                    'w-60' : sidebarOpen
                                },
                                {  
                                    'w-20' : !sidebarOpen
                                }
        )}>
            {/* Logo */}
            <div className={clsx("p-4 flex gap-2 flex-nowrap overflow-hidden text-center items-center justify-center",
                {
                    'justify-between' : sidebarOpen
                }
            )}>
                <PowerIcon className="w-12"/>
                <p className={clsx("text-2xl",
                    {
                        'block' : sidebarOpen
                    },
                    {
                        'hidden' : !sidebarOpen
                    }
                )}>Acme</p>
            </div>
            {/* NavLinks */}
            <div className="w-full mt-auto mb-auto flex-col flex items-center gap-2">
                <div className="mb-4">
                    <ArrowRightIcon onClick={() => setSidebarOpen(!sidebarOpen)} 
                                    className={clsx("w-6 cursor-pointer transition-transform hover:opacity-50",
                                        {
                                            'rotate-180' : sidebarOpen
                                        }
                                    )}
                        />
                </div>
                    <VerticalNavLinks />
            </div>

            <div className="mt-auto">
                <ThemeSwitcher />
            </div>
            {/* Logout */}
            <div className="mt-2 w-full">
                <Button className={clsx("w-full bg-red-600 text-white",
                    {
                        'justify-between' : sidebarOpen
                    },
                    {
                        'justify-center' : !sidebarOpen
                    }
                )} radius="none">
                    <PowerIcon  className="w-12"/>
                    <p className={clsx("text-xl",
                        {
                            'block' : sidebarOpen
                        },
                        {
                            'hidden' : !sidebarOpen
                        }
                    )}>
                        Logout
                    </p>
                </Button>
            </div>
        </section>
        </SidebarContext.Provider>

    )
}

