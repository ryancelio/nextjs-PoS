'use client';

import Image from "next/image"
import React from "react";

export default function Card({imageParams,}:{
    imageParams:{
        src: string;
        alt: string;
        title: string;
        href: string;
    }
}
){

    return(
        <div className="relative md:w-[200px] sm:w-[100px] group mt-5">
            <Image
            src={imageParams.src}
            alt={imageParams.alt}
            height={300}
            width={200}
            className=""
             />
        <div className="group-hover:backdrop-blur-sm group-hover:brightness-75 
                        transition-all ease-in 
                        cursor-pointer w-full h-full absolute top-0 
        "/ >
            <p className="  absolute text-lg bottom-5 left-1/2 -translate-x-1/2 drop-shadow-lg font-semibold w-full text-center cursor-pointer 
                            transition-all ease-out
                            group-hover:bottom-1/2 
            ">
            {imageParams.title}
            </p>
        </div>
    )
}
