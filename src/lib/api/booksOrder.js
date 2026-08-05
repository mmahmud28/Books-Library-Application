const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const createBorrowRequest  = async (borrowData) => {
    const res = await fetch(`${baseUrl}/api/orderBooks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowData),
    });
    const data = await res.json();
    return data;
};

export const getBorrowRequestById = async (id) => {
  const res = await fetch(`${baseUrl}/api/orderBooks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
  
};

export const updateBorrowRequest = async (id, updatedData) => {
  const res = await fetch(`${baseUrl}/api/orderBooks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  return await res.json();
};