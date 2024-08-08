'use server';

import User from "./user";
import { db } from "../lib/db";


export default async function UsersTest(){
    try{
        const users: User[] = await db('users').select('*');
        return(
            <div>
            {users.map((user) =>{
                return(
                    <h1 key={user.id}>
                        {user.name}
                    </h1>
                )
            })}
            </div>
        ) 
    }catch(error){
        console.error('Error fetching user data', error);
        return <div><h1>{`Error fetching user data Error ${error}`}</h1></div>
    }


}
