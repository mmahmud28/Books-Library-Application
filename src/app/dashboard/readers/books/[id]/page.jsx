import BookDetailUI from "@/app/Components/BookDetailUI";
import { getSingleBooks } from "@/lib/api/booksLoad";
import { getUserSession } from "@/lib/core/session";

const BooksDeatiledPage = async ({ params }) => {
  const { id } = await params;
  const safeBook = await getSingleBooks(id);
  const userData = await getUserSession();

  return <BookDetailUI safeBook={safeBook} userData={userData} />;
};

export default BooksDeatiledPage;