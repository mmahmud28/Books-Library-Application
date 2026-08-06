const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const createBorrowRequest = async (borrowData) => {
  try {
    const res = await fetch(`${baseUrl}/api/orderBooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(borrowData),
    });

    const data = await res.json();

    return {
      ...data,
      status: res.status,
    };
  } catch (error) {
    console.error("Borrow request error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
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



export const checkAlreadyOrdered = async (userId, bookId) => {
    try {
        if (!userId || !bookId) {
            return {
                success: false,
                alreadyOrdered: false,
                message: "User ID and Book ID are required.",
            };
        }

        const url = `${baseUrl}/api/checkAlreadyOrdered?userId=${encodeURIComponent(
            userId
        )}&bookId=${encodeURIComponent(bookId)}`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            cache: "no-store",
        });

        // আগে status check
        if (!res.ok) {
            const text = await res.text();

            console.error("Check order API error:", {
                status: res.status,
                statusText: res.statusText,
                response: text,
            });

            return {
                success: false,
                alreadyOrdered: false,
                message: `API Error: ${res.status}`,
            };
        }

        // JSON কিনা check
        const contentType = res.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
            const text = await res.text();

            console.error(
                "API did not return JSON:",
                text
            );

            return {
                success: false,
                alreadyOrdered: false,
                message: "Server did not return JSON.",
            };
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error("checkAlreadyOrdered error:", error);

        return {
            success: false,
            alreadyOrdered: false,
            message: "Failed to check existing order.",
        };
    }
};

export const userOrderList = async (userId) => {
  const res = await fetch(`${baseUrl}/api/userOrders/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};


export const libRianBooksOrderList = async (libId) => {
  const res = await fetch(
    `${baseUrl}/api/librarianOrders/${libId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return await res.json();
};
