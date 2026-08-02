const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const allUserList = async () => {
    const res = await fetch(`${baseUrl}/api/userList`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

export const allBooksList = async () => {
    const res = await fetch(`${baseUrl}/api/adminBooksList`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}


export const booksStatusUpdate = async (bookId) => {
    const res = await fetch(`${baseUrl}/api/books/adminStatus/${bookId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await res.json();
};