import BorrowOrderForm from "@/app/Components/BorrowOrderForm";
import { getSingleBooks } from "@/lib/api/booksLoad";
import { getUserSession } from "@/lib/core/session";

export default async function OrderBooks({ params }) {
  // Next.js 15+ এ params একটি Promise
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    return <div className="p-10 text-white text-center">Invalid Book ID</div>;
  }

  // API বা Database থেকে ডাটা আনা
  const rawBook = await getSingleBooks(id);
  const userData = await getUserSession();

  // 🔴 গুরুত্বপূর্ণ: API থেকে response কীভাবে আসছে তা নিশ্চিত করুন। 
  // অনেক সময় response 'rawBook.data' বা 'rawBook.result' এ থাকে।
  const safeBook = rawBook?.data || rawBook?.book || rawBook || null;

  

  if (!safeBook || Object.keys(safeBook).length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        <p className="text-xl font-semibold">Book information not found!</p>
      </div>
    );
  }

  return <BorrowOrderForm safeBook={safeBook} userData={userData} />;
}