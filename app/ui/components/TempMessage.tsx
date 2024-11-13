'use client';
import clsx from "clsx";
import { useEffect } from "react";

export function TempModal({ isVisible, setVisible, value, setValue, title, description, isPending }:
    {
        isVisible: boolean,
        value: number,
        setValue: (value: number) => void,
        setVisible: (value: boolean) => void,
        title: string,
        description: string,
        isPending: boolean,
    }) {


    const resetValue = () => {
        setValue(3);
    }

    // useEffect(() => {
    //     const decreaseValue = setTimeout(() => {
    //         console.log(value)

    //         //@ts-ignore
    //         setValue((prev) => {
    //             if (prev <= 0) {
    //                 setVisible(false)
    //                 clearInterval(decreaseValue);
    //                 return 0;
    //             }
    //             return (prev - 4);
    //         })
    //     }, 60);

    //     return () => clearInterval(decreaseValue);
    // }, [setValue, value, setVisible])

    useEffect(() => {
        const decreaseValue = setTimeout(() => {
            console.log(value)
            if (!isPending && value >= 0) {
                // setVisible(true)
                //@ts-ignore
                setValue((prev) => {
                    if (prev <= 0) {
                        // setVisible(false);
                        clearTimeout(decreaseValue);
                        return 0;
                    }
                    return (prev - 1);

                })
            } else if (isPending) {
                setValue(3);
            }
        }, 2000)
        return () => clearTimeout(decreaseValue);
    }, [value, isPending]);

    return (
        <div className={clsx(["transition-opacity ease-in"],
            ["bg-red-500 w-80 h-20 rounded-lg shadow-lg text-white text-center grid grid-cols-1"],
            [""],
            {
                "hidden": value == 0  || isPending,
            },
            {
                "opacity-0": value == 1,
            },
            {
                "block opacity-100": value > 1
            }
        )}
            onMouseEnter={resetValue}
        >
            <div className="p-2">
                <h1 className="text-md font-bold mb-2">
                    {title}
                </h1>
                <p className="text-sm">
                    {description}
                </p>
            </div>
            {/* 
                TODO: Fix progressbar decrease, probrably by self implementing a progressbar with animation 
                <Progress 
                value={value}
                size="sm"
                className=""
            /> */}
        </div>
    )

}