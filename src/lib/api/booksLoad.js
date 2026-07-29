const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getlibraribooks = async (librarianId, status = 'active') =>{

    const res = await fetch(`${baseUrl}/api/books?librarianId=${librarianId}&status=${status}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    return data;

}