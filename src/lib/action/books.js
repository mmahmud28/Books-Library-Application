"use server"

import { serverMutation } from "../core/server";


export const createBooks = async (bookData) =>{
    return await serverMutation('/api/addBooks', bookData);
}
