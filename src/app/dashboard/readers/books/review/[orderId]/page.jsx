import OrderBooksReviewClient from "@/app/Components/OrderBooksReviewClient";
import { singleOrderDetailes } from "@/lib/api/booksOrder";

const ReviewPage = async ({ params }) => {
  const { orderId } = await params;

  console.log("Order ID:", orderId);

  const order = await singleOrderDetailes(orderId);

  console.log(order);

  return (
    <OrderBooksReviewClient order={order} />
  );
};

export default ReviewPage;