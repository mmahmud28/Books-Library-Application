import LibrarianBookDetailPage from "@/app/Components/LibrarianBookDetailPage";
import { getSingleBooks } from "@/lib/api/booksLoad";

const BooksDeatiledPage = async ({ params }) => {
  const { id } = await params;
  const safeBook = await getSingleBooks(id);

  console.log(safeBook);
  

  return <LibrarianBookDetailPage safeBook={safeBook} />;
};

export default BooksDeatiledPage; 