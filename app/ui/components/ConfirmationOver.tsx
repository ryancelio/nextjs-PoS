import { Button } from "@nextui-org/react";


export default function ConfirmationOver({title,desc,CancelText,CancelAction,ConfirmText,ConfirmAction}:
    {   title:string,
        desc:string,
        CancelText?: string,
        CancelAction: Function,
        ConfirmText?: string,
        ConfirmAction: Function,
    }
){

    return(
        <div>
            <div className="fixed z-40 h-screen w-screen opacity-70 bg-neutral-900" />
            <div className="text-white rounded-lg md:w-2/6 xl:w-3/12 h-1/5 z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          bg-gradient-radial from-neutral-700 to-neutral-800 border-1"
                             >
                <div className="w-full text-2xl justify-center flex p-2">
                    <h1>{title}</h1>
                </div>
                <div className="w-full text-lg justify-center flex py-3">
                    <p>{desc}</p>
                </div>
                <div className="mt-auto flex justify-evenly pt-8">
                    <Button color="success" variant="solid" onPress={() => ConfirmAction()}>
                        {ConfirmText? ConfirmText : "Confirm"}
                    </Button>
                    <Button color="danger" variant="ghost" onPress={() => CancelAction()}>
                        {CancelText? CancelText : "Cancel"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
