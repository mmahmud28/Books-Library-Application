import { serverFetch } from "../core/server"


export const getLibraianData = async (librianId) => {
    return serverFetch(`/api/librarians/${librianId}`);
}

// get all Librians Data