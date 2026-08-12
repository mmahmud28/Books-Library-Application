import PublicBookDetailUI from "@/app/Components/PublicBookDetailUI";
import { getSingleBooks } from "@/lib/api/booksLoad";
import { getUserSession } from "@/lib/core/session";
import { headers } from "next/headers";

const BooksDeatiledPage = async ({ params }) => {
  const { id } = await params;
  const bookData = await getSingleBooks(id);
  const userData = await getUserSession();

  // API response থেকে বই, রেভিউ এবং রেভিউ কাউন্ট আলাদা করা হচ্ছে
  const safeBook = bookData?.book || {};
  const reviews = bookData?.reviews || [];
  const reviewCount = bookData?.reviewCount || 0;

  const token = await auth.api.getToken({
    headers: await headers(),
  })

  console.log("Your JWT Token:", token);
  
  

  return (
    <PublicBookDetailUI 
      safeBook={safeBook} 
      reviews={reviews} 
      reviewCount={reviewCount} 
      userData={userData} 
    />
  );
};

export default BooksDeatiledPage;