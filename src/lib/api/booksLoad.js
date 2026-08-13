const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getlibraribooks = async (addedBy, status = 'active') =>{

    const res = await fetch(`${baseUrl}/api/books?addedBy=${addedBy}&status=${status}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    return data;
}

export const getAllBooks = async (status='active') =>{
    const res = await fetch(`${baseUrl}/api/allActiveBooks?status=${status}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

export const getSingleBooks = async (id) =>{
    const res = await fetch(`${baseUrl}/api/books/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

export const publicStats = async () =>{
    const res = await fetch(`${baseUrl}/api/public-stats`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
} 