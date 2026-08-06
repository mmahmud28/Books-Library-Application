const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getlibraribooks = async (id) =>{

    const res = await fetch(`${baseUrl}/api/librarianAllBooks?addById=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    return data;
}

export const allLibrarianList = async () => {
    const res = await fetch(`${baseUrl}/api/librarianList`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

