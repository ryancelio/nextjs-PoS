'use client';

import { PowerIcon, PlusIcon,MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavLinks from "./nav-links";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import MobileNavLinks from "./mobile-nav-links";

export default function NavBar(){

    function handleSearch(term: string){
        // console.log(term);
    }
    
    const [searchIsFocus,setSearchIsFocus] = useState(false);

    const [navbar,setNavbar] = useState(false);


    return(
        // Navbar Container
        <section className="w-full sticky top-0 left-0 right-0 z-10 bg-white dark:bg-slate-800 bg-opacity-[99%] shadow-lg
        ">
        <div className="flex items-center justify-between
        ">
            {/* Logo */}
            <Link href={"/"} className="flex-shrink-0 group flex items-center align-middle py-2 pl-3 mr-16">
                <PowerIcon className="w-12 block group" />
                <p className="  text-xl transition-all
                                md:absolute md:left-3 md:opacity-0 md:ease-out md:pl-2 md:group-hover:opacity-100 md:group-hover:translate-x-12
                ">
                Acme
                </p>
            </Link>
            {/* Center Container */}
            <div className="collapse hidden mr-auto md:block md:visible md:ml-6">
                <NavLinks />
            </div>
            {/* Rightmost Container */}
            <div className="pr-3 flex align-middle justify-center items-center">
                <MagnifyingGlassIcon className={`w-6 ml-auto cursor-pointer
                                                md:relative md:left-56
                                                ${searchIsFocus ? `opacity-50` : 'opacity-100'}`}
                                    //Todo: Change onClick to onChange on input element                                                
                                    onClick={() =>{}}
                />
                <input  type="text" name="search" id="search" onFocus={(() =>setSearchIsFocus(true))} onBlur={(() => setSearchIsFocus(false))}
                        // Todo: handleSearch
                        onChange={(e)=>{handleSearch(e.target.value)}}
                        className=" collapse hidden
                                    md:visible md:block md:dark:bg-slate-700 md:rounded-lg md:mr-10 md:h-10 md:p-3
                                    md:light:bg-gray-400
                "> 
                
                </input>
                {/* Upload Button Dekstop */}
                <button className=" collapse 
                                    md:visible md:gap-3 md:flex md:p-2 md:px-4 md:text-lg md:border-2 md:rounded-md md:bg-gray-900
                                    md:hover:bg-gray-800  md:active:bg-gray-700
                ">
                    <PlusIcon className="w-6 text-green-500"/>
                    Upload
                </button>
                {/* Menu Button Mobile */}
                <button className="flex visible items-center ml-auto bg-slate-900 p-2 text-md md:collapse"
                        onClick={() => setNavbar(!navbar)}
                >
                    {navbar ?
                        <XMarkIcon className="w-6" /> :
                        <Bars3Icon className="w-6"/>
                    }
                </button>
            </div>
        </div>
        <div className={clsx(
            'grid grid-cols-1 justify-self-center pb-3 md:hidden',
            {
                'pb-6 pt-2 px-12 block' : navbar,
                'hidden' : !navbar
            }
        )}
        >
            <MobileNavLinks />
        </div>
        </section>
    )
}
