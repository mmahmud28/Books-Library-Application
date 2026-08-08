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


export const userSummeryData = async (userId) => {
    if (!userId) return null;

    const res = await fetch(
        `${baseUrl}/api/userSummary/${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch user summary");
    }

    return await res.json();
};

export const librarianSummeryData = async (userId) => {
    if (!userId) return null;

    const res = await fetch(
        `${baseUrl}/api/librarianSummary/${userId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch librarian summary");
    }

    return await res.json();
};

export const adminSummeryData = async () => {
    const res = await fetch(
        `${baseUrl}/api/adminSummary`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error(
            "Failed to fetch admin summary"
        );
    }

    return await res.json();
};