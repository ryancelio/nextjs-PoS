import clsx from "clsx";
interface EstoqueValues {
    estoque02: number,
    estoque03: number,
    estoque04: number,
}


export function EstoqueInput({label,id,value,setEstoqueValues,estoqueValues,getSumEstoque,isReadOnly}:
    {label: string,
        id: string,
        value?: number | any,
        setEstoqueValues: Function,
        estoqueValues: EstoqueValues,
        getSumEstoque?: Function,
        isReadOnly?: boolean,
    }
){
// function getEstoqueValues(id: string){
//     switch(id){
//         case "estoque02":
//             return estoqueValues.estoque02;
//         case "estoque03":
//             return estoqueValues.estoque03;
//         case "estoque04":
//             return estoqueValues.estoque04;
//         }

// }

    return(
        <div className="items-center justify-center relative group">
            <label htmlFor={id} className={clsx(
                "absolute left-1/2 -translate-x-[150%] z-20 top-[5px] font-semibold text-lg group-hover:opacity-50 group-focus-within:opacity-50",
                {
                    '-translate-x-[220%] opacity-50 group-hover:opacity-100' : isReadOnly != null && isReadOnly
                }
            )}>
                {label}
            </label>
            <input type="number"
            className={clsx(
                        `[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                        text-xl h-10 w-full rounded-lg text-right pr-4 absolute top-0 left-1/2 -translate-x-1/2
                        border-1 border-neutral-600`,
                        {
                            'dark:text-[rgba(255,255,255,0.5)] text-[rgba(80,80,80,0.8)] hover:text-neutral-900 dark:hover:text-white' : isReadOnly != null && isReadOnly
                        }
                    )}
                      name={id}
                      id={id}
                      value={value}
                      placeholder="0"
                      onChange={(e) => setEstoqueValues(e)}
                      onBlur={getSumEstoque? () => getSumEstoque(): () => {}}
                      readOnly={isReadOnly}

            />
        </div>
    )
}
