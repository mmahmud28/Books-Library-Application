const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getlibraribooks = async (publisher, status = 'active') =>{

    const res = await fetch(`${baseUrl}/api/books?publisher=${publisher}&status=${status}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    return data;

}

export const getAllBooks = async () =>{
    const res = await fetch(`${baseUrl}/api/allBooks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}