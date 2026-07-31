import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession  = async () =>{
    const session = await auth.api.getUserSession({
        headers: await headers()
    });

    return session?.user || null;

}