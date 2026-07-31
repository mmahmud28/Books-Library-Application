import { serverDelete, serverFetch } from "../core/server"


export const getLibraianData = async (librianId) => {
    return serverFetch(`/api/librarians/${librianId}`);
}

export const bookDelete = async (bookId) => {
  return serverDelete(`/api/deleteBooks/${bookId}`, {
    method: "DELETE",
  });
};
// get all Librians Data