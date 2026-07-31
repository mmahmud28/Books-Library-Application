import BookDetailUI from "@/app/Components/BookDetailUI";
import { getSingleBooks } from "@/lib/api/booksLoad";

const BooksDeatiledPage = async ({ params }) => {
  const { id } = await params;
  const safeBook = await getSingleBooks(id);

  return <BookDetailUI safeBook={safeBook} />;
};

export default BooksDeatiledPage;