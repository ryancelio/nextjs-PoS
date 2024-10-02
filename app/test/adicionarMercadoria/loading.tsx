import { Spinner } from "@nextui-org/react";
import TopBar from "./TopBar";

export default function loading(){

    return(
    <section className="w-full h-screen dark:bg-zinc-900">
        <TopBar />
        <div className="grid place-items-center h-full">
            <Spinner />
        </div>
    </section>)
}
