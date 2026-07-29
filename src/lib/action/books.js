"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createBooks = async (bookData) =>{
    const res = await fetch(`${baseUrl}/api/addBooks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
    });
    
    if (!res.ok){
        console.log(res);
        
    } else{
        console.log(res);        
    }

    return res.json();
    
}