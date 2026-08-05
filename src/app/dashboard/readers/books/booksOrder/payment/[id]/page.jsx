import { getBorrowRequestById } from "@/lib/api/booksOrder";
import Link from "next/link";

const PaymentPage = async ({ params }) => {
  const { id } = await params;
  const orderData = await getBorrowRequestById(id);

  if (!orderData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="alert alert-error max-w-md shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Borrow request not found!</span>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(orderData.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Order & Borrower Details */}
        <div className="lg:col-span-7 space-y-6">

          {/* Header Card */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <span className="badge badge-warning gap-2 font-medium capitalize">
                    <span className="w-2 h-2 rounded-full bg-warning-content animate-pulse"></span>
                    {orderData.borrowStatus.replace("_", " ")}
                  </span>
                  <h1 className="text-2xl font-bold mt-2">Borrow Order Summary</h1>
                  <p className="text-xs text-base-content/60 mt-1 font-mono">
                    ID: {orderData._id}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-base-content/60 block">Requested On</span>
                  <span className="text-sm font-semibold">{formattedDate}</span>
                </div>
              </div>

              <div className="divider my-2"></div>

              {/* Borrower Details Grid */}
              <h2 className="text-lg font-semibold mb-2 text-primary">Borrower Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-base-200/50 p-3 rounded-lg">
                  <span className="text-xs text-base-content/60 block">Full Name</span>
                  <span className="font-medium text-base-content">{orderData.borrowerName}</span>
                </div>
                <div className="bg-base-200/50 p-3 rounded-lg">
                  <span className="text-xs text-base-content/60 block">Email Address</span>
                  <span className="font-medium text-base-content break-all">{orderData.email}</span>
                </div>
                <div className="bg-base-200/50 p-3 rounded-lg">
                  <span className="text-xs text-base-content/60 block">Phone Number</span>
                  <span className="font-medium text-base-content">{orderData.phone}</span>
                </div>
                <div className="bg-base-200/50 p-3 rounded-lg">
                  <span className="text-xs text-base-content/60 block">Delivery Address</span>
                  <span className="font-medium text-base-content">{orderData.address}</span>
                </div>
              </div>

              {orderData.notes && (
                <div className="mt-2 bg-base-200/30 p-3 rounded-lg border border-base-300/50">
                  <span className="text-xs text-base-content/60 block font-medium">Notes</span>
                  <p className="text-xs text-base-content/80 mt-1">{orderData.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Guarantee Badge */}
          <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl border border-primary/20 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <p className="text-xs font-medium">
              Your borrowing request will be processed immediately after successful payment verification.
            </p>
          </div>
        </div>

        {/* Right Column: Checkout & Payment Action */}
        <div className="lg:col-span-5">
          <div className="card bg-base-100 shadow-xl border border-base-300 sticky top-8">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold border-b border-base-200 pb-3">
                Payment Overview
              </h2>

              {/* Rental Duration Summary */}
              <div className="space-y-3 my-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-base-content/70">Borrow Duration</span>
                  <span className="badge text-white badge-neutral badge-outline font-semibold">
                    {orderData.borrowDays} Days
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-base-content/70">Payment Status</span>
                  <span className="badge badge-warning gap-1 capitalize font-medium">
                    {orderData.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-base-content/70">Book Reference ID</span>
                  <span className="font-mono text-xs">{orderData.bookId.slice(0, 10)}...</span>
                </div>

                <div className="divider my-1"></div>

                {/* Pricing Calculation */}
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary text-2xl font-extrabold">
                    ৳{(orderData.borrowDays * 10).toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-base-content/50 text-right">
                  Calculated at ৳10/day rate
                </p>
              </div>

              {/* Checkout / Payment Options */}
              <div className="card-actions flex-col gap-3 mt-4">

                <form action="/api/checkout_sessions" method="POST" className="w-full">
                 
                  <section>
                    <input
                      type="hidden"
                      name="orderId"
                      value={orderData._id}
                    />
                    <button
                      type="submit" role="link"
                      className="btn btn-primary btn-block text-white font-semibold text-base shadow-lg hover:shadow-primary/30 gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                      Proceed to Payment
                    </button>
                  </section>
                </form>


                <Link href="/books" className="btn btn-ghost btn-block btn-sm text-base-content/70">
                  Cancel & Return
                </Link>
              </div>

              {/* Accepted Methods */}
              <div className="mt-6 pt-4 border-t border-base-200 text-center">
                <span className="text-[11px] uppercase tracking-wider text-base-content/50 font-semibold block mb-2">
                  Secured Payment Via
                </span>
                <div className="flex justify-center items-center gap-2">
                  <span className="badge badge-ghost text-xs">bKash</span>
                  <span className="badge badge-ghost text-xs">Nagad</span>
                  <span className="badge badge-ghost text-xs">Cards</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;