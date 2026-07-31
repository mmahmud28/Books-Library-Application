"use server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);


    //handel 404 error
    if (res.status === 404) {
        throw new Error("API endpoint not found");
    } else if (res.status === 500) {
        throw new Error("Internal Server Error");
    } else if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
}

export const serverMutation = async (path, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    //handel 404 error
    if (res.status === 404) {
        throw new Error("API endpoint not found");
    } else if (res.status === 500) {
        throw new Error("Internal Server Error");
    } else if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();

}