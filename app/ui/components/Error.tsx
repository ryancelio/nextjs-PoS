

export default function ErrorDisplayOver({error,errorName,errorDesc}:{error: Error,errorName: string, errorDesc: string}){

    return(
        <div>
            <div className="fixed z-40 h-screen w-screen opacity-70 bg-neutral-600">
            </div>
            <div className="text-white fixed flex-1 shadow-2xl rounded-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3/5 h-fit bg-neutral-700 z-50
                            ">
                 <div className=" w-full text-center rounded-t-lg text-lg bg-red-600 p-2">
                    <h1 className=" text-5xl rounded-lg font-semibold">ERRO</h1>
                 </div>
                 <div className="p-2 px-5 grid place-items-center mt-5 mb-2">
                    <h1 className="text-2xl mb-1 font-semibold">{errorName}</h1>
                    <p className="text-lg">{errorDesc}</p>
                    <p className="text-md mt-8">Se o erro persistir, entre em contato com o admnistrador do sistema e forneça o seguinte erro:</p>
                    <p>{error.toString()}</p>
                 </div>
            </div>
        </div>
    )
}
