import OrderBooksReviewClient from "@/app/Components/OrderBooksReviewClient";
import { singleOrderDetailes } from "@/lib/api/booksOrder";

const ReviewPage = async ({ params }) => {
  const { orderId } = await params;



  const order = await singleOrderDetailes(orderId);

 

  return (
    <OrderBooksReviewClient order={order} />
  );
};

export default ReviewPage;