import BorrowOrderForm from "@/app/Components/BorrowOrderForm";
import { getSingleBooks } from "@/lib/api/booksLoad";
import { getUserSession } from "@/lib/core/session";

export default async function OrderBooks({ params }) {
  const { id } = await params;

  const safeBook = await getSingleBooks(id);

  const userData = await getUserSession();


  return <BorrowOrderForm safeBook={safeBook} userData={userData} />;
}