import PublicBookDetailUI from "@/app/Components/PublicBookDetailUI";
import { getSingleBooks } from "@/lib/api/booksLoad";
import { getUserSession } from "@/lib/core/session";

const BooksDeatiledPage = async ({ params }) => {
  const { id } = await params;
  const safeBook = await getSingleBooks(id);
  const userData = await getUserSession();

  return <PublicBookDetailUI safeBook={safeBook} userData={userData} />;
};

export default BooksDeatiledPage;