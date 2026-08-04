import BorrowOrderForm from "@/app/Components/BorrowOrderForm";
import { getSingleBooks } from "@/lib/api/booksLoad";

export default async function OrderBooks({ params }) {
  const { id } = await params;

  const safeBook = await getSingleBooks(id);

  return <BorrowOrderForm safeBook={safeBook} />;
}