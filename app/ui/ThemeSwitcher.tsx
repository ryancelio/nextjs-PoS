"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { Suspense, useContext, useEffect, useState } from "react";
import { SidebarContext } from "./verticalNavbar/sidebarOpenContext";
import clsx from "clsx";
import { Skeleton, Switch } from "@nextui-org/react";

export function ThemeSwitcher(){
    const[mounted,setMounted] = useState(false);
    const {theme,setTheme} = useTheme();
    let sidebarOpen = useContext(SidebarContext);
    const [isSelected,setSelected] = useState(theme === 'dark');

    useEffect(() =>{
        setMounted(true)
    }, [])

    if(!mounted) return(
        <Skeleton className="rounded-xl mb-1">
            <Switch></Switch>
        </Skeleton>
    );

    return(
        <div className=" items-center flex gap-2">
            <Switch className="w-full"
                    size="lg"
                    startContent={<MoonIcon />}
                    endContent={<SunIcon />}
                    isSelected={isSelected}
                    onValueChange={(isSelected) =>{
                        setSelected(isSelected);
                        isSelected ? setTheme('dark') : setTheme('light')
                    }}
                    />
            <span className={clsx("text-xl capitalize text-nowrap overflow-x-hidden w-full",
                {
                    'block text-opacity-100' : sidebarOpen
                },
                {
                    'hidden text-opacity-15' : !sidebarOpen
                }
            )}>
                {theme} Mode
            </span>
        </ div>

    )
}
