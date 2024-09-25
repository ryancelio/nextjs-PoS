'use server';
import {z} from "zod"
import { MercadoriaSchema } from "@/app/lib/types";

export async function addFormMerc(prevState: {message:string}, formData: FormData){

    // formData.set('descricao',"C TA DOIDO?");

    
    console.log(MercadoriaSchema.partial().parse(formData));

    try{
        console.log(MercadoriaSchema.partial().parse(formData));
        return({message: "Test Success"})
    }catch(e){
        // console.log(MercadoriaSchema.partial().parse(formData));
        console.log(e)
        return({message: "Test Failed"})
    }
}