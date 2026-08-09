import LibrarianBookDetailPage from "@/app/Components/LibrarianBookDetailPage";
import { getSingleBooks } from "@/lib/api/booksLoad";
import { getUserSession } from "@/lib/core/session";

const BooksDeatiledPage = async ({ params }) => {
  const { id } = await params;
  
  // API Call & User Session
  const safeBook = await getSingleBooks(id);
  const userData = await getUserSession();

  // API response থেকে বই, রিভিউ এবং রিভিউ কাউন্ট আলাদা করা হচ্ছে
  const reviews = safeBook?.reviews || [];
  const reviewCount = safeBook?.reviewCount || 0;
 


  if (!safeBook) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        <p className="text-xl font-medium">বইয়ের তথ্য পাওয়া যায়নি!</p>
      </div>
    );
  }

  return (
    <LibrarianBookDetailPage 
      safeBook={safeBook} 
      reviews={reviews} 
      reviewCount={reviewCount} 
      userData={userData} 
    />
  );
};

export default BooksDeatiledPage;