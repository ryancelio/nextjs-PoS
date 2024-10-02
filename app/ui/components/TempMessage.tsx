'use client';
import { Progress } from "@nextui-org/react";
import clsx from "clsx";
import { SetStateAction, useEffect, useState } from "react";
import { any } from "zod";

export function TempModal({isVisible,setVisible,value,setValue}:
    {
        isVisible: boolean,
        value: number,
        setValue: (value: number) => void,
        setVisible: (value: boolean) => void,
    }){

    const resetValue = () => {
        setValue(100);
    }
    useEffect(() => {
        const decreaseValue = setTimeout(() => {
            console.log(value)
            //@ts-ignore
            setValue((prev) => {
                if(prev <= 0){
                    setVisible(false)
                    clearInterval(decreaseValue);
                    return 0;
                }
                return (prev - 1);
            })
        }, 30);

        return () => clearInterval(decreaseValue);
    },[setValue,value,setVisible])

    // useEffect(() =>{
    //     const beginTimeout = setInterval(()=>{
    //         const decreaseValue = setInterval(() =>{
    //             setValue((prev) => {
    //                 if(prev <= 0){
    //                     clearInterval(decreaseValue);
    //                     return 0;
    //                 }
    //                 return Math.max(prev - 3, 0);
    //             })         
    //         }, 125)
    //     }, 500)

    //     return () => clearInterval(beginTimeout)
    // },[])


    return(
        <div className={clsx("opacity-[var(--user-opacity)] bg-red-500 w-80 h-fit rounded-lg left-1/2 -translate-x-1/2 items-center text-center place-items-center transition-none",
            {
                "hidden" : value == 0 && !isVisible,
            },
            {
                "block" : value > 0 && isVisible
            }
    )}
        style={{
            //@ts-ignore
            '--user-opacity': (value / 100),
        }}
        onMouseEnter={resetValue}
        >
            <div className="p-2">
                <h1 className="text-md">
                    Lorem ipsum dolor sit amet.
                </h1>
                <p className="text-sm">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, eius.
                </p>
            </div>
            {/* <Progress 
                value={value}
                size="sm"
                className=""
            /> */}
        </div>
    )

}