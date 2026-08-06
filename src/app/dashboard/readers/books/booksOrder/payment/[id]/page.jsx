import { getBorrowRequestById } from "@/lib/api/booksOrder";
import Link from "next/link";

const PaymentPage = async ({ params }) => {
  const { id } = await params;
  const orderData = await getBorrowRequestById(id);

  if (!orderData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-base-200/50">
        <div className="card bg-base-100 shadow-2xl max-w-md w-full border border-error/20 text-center p-8">
          <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-base-content mb-2">Request Not Found</h2>
          <p className="text-sm text-base-content/60 mb-6">We couldn't find any active borrow request matching this ID.</p>
          <Link href="/books" className="btn btn-primary btn-outline w-full">
            Return to Books
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(orderData.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const totalAmount = (orderData.borrowDays * 10).toFixed(2);

  return (
    <div className="min-h-screen bg-base-200/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <div className="text-sm breadcrumbs mb-6 text-base-content/60">
          <ul>
            <li><Link href="/books">Books</Link></li>
            <li>Borrow Request</li>
            <li className="text-primary font-semibold">Payment</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Order & Borrower Information */}
          <div className="lg:col-span-7 space-y-6">

            {/* Main Header & Status Card */}
            <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b border-base-200">
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-warning/15 text-warning-content border border-warning/20 mb-3">
                      <span className="w-2 h-2 rounded-full bg-warning animate-ping"></span>
                      <span className="capitalize">{orderData.borrowStatus?.replace("_", " ")}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
                      Borrow Checkout
                    </h1>
                  </div>
                  <div className="text-right bg-base-100/80 backdrop-blur px-3 py-1.5 rounded-lg border border-base-200">
                    <span className="text-[10px] uppercase font-bold text-base-content/40 block">Requested On</span>
                    <span className="text-xs font-bold text-base-content">{formattedDate}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-base-content/50">Order Reference:</span>
                  <code className="text-xs font-mono font-bold bg-base-200 px-2 py-0.5 rounded text-primary">
                    {orderData._id}
                  </code>
                </div>
              </div>

              {/* Borrower Details Section */}
              <div className="p-6 space-y-4">
                <h2 className="text-sm uppercase tracking-wider font-bold text-primary/90 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Borrower Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-base-200/40 hover:bg-base-200/70 transition-colors p-3.5 rounded-xl border border-base-200/60">
                    <span className="text-[11px] font-semibold text-base-content/50 uppercase block mb-1">Full Name</span>
                    <span className="font-semibold text-base-content">{orderData.borrowerName}</span>
                  </div>

                  <div className="bg-base-200/40 hover:bg-base-200/70 transition-colors p-3.5 rounded-xl border border-base-200/60">
                    <span className="text-[11px] font-semibold text-base-content/50 uppercase block mb-1">Email Address</span>
                    <span className="font-semibold text-base-content break-all">{orderData.email}</span>
                  </div>

                  <div className="bg-base-200/40 hover:bg-base-200/70 transition-colors p-3.5 rounded-xl border border-base-200/60">
                    <span className="text-[11px] font-semibold text-base-content/50 uppercase block mb-1">Phone Number</span>
                    <span className="font-semibold text-base-content">{orderData.phone}</span>
                  </div>

                  <div className="bg-base-200/40 hover:bg-base-200/70 transition-colors p-3.5 rounded-xl border border-base-200/60">
                    <span className="text-[11px] font-semibold text-base-content/50 uppercase block mb-1">Delivery Address</span>
                    <span className="font-semibold text-base-content">{orderData.address}</span>
                  </div>
                </div>

                {orderData.notes && (
                  <div className="mt-4 bg-amber-500/5 p-4 rounded-xl border border-amber-500/20">
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase block mb-1">Special Instructions</span>
                    <p className="text-xs text-base-content/80 leading-relaxed">{orderData.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Guarantee Badge */}
            <div className="flex items-center gap-4 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
              <div className="p-2.5 bg-emerald-500/20 rounded-xl shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <p className="text-xs font-medium leading-relaxed">
                <strong className="block font-semibold mb-0.5">Instant Verification</strong>
                Your request is reserved. Upon completing payment, your order will transition directly to processing.
              </p>
            </div>
          </div>

          {/* Right Column: Order Ledger & Payment Form */}
          <div className="lg:col-span-5">
            <div className="card bg-base-100 shadow-xl border border-base-200 sticky top-6">
              <div className="p-6">
                <h2 className="text-lg font-bold text-base-content border-b border-base-200 pb-3 flex items-center justify-between">
                  <span>Payment Summary</span>
                  <span className="badge badge-neutral badge-sm font-normal">Step 2 of 2</span>
                </h2>

                {/* Rental Details */}
                <div className="space-y-3.5 my-5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-base-content/60">Borrow Duration</span>
                    <span className="font-semibold text-base-content bg-base-200 px-2.5 py-1 rounded-md text-xs">
                      {orderData.borrowDays} Days
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-base-content/60">Payment Status</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-warning/10 text-warning border border-warning/20 capitalize">
                      {orderData.paymentStatus}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-base-content/60">Book ID</span>
                    <span className="font-mono text-xs text-base-content/80 bg-base-200/60 px-2 py-0.5 rounded">
                      {orderData.bookId ? `${orderData.bookId.slice(0, 10)}...` : "N/A"}
                    </span>
                  </div>

                  <div className="divider my-2"></div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-base-content/60">
                      <span>Base Rental Fee (৳10/day)</span>
                      <span>৳{(orderData.borrowDays * 10).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-base-content/60">
                      <span>Service Fee</span>
                      <span className="text-emerald-500 font-medium">FREE</span>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 mt-3">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-xs font-bold text-base-content/70 block uppercase tracking-wide">Total Payable</span>
                        <span className="text-[10px] text-base-content/50">Includes all applicable taxes</span>
                      </div>
                      <span className="text-3xl font-black text-primary">
                        ৳{totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Actions */}
                <div className="space-y-3 mt-6">
                  <form action="/api/checkout_sessions" method="POST" className="w-full">
                    <input type="hidden" name="orderId" value={orderData._id} />
                    <button
                      type="submit"
                      role="link"
                      className="btn btn-primary btn-block text-primary-content font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all gap-2 text-base"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                      Proceed to Secure Pay
                    </button>
                  </form>

                  <Link href="/books" className="btn btn-ghost btn-block btn-sm text-base-content/60 hover:text-base-content">
                    Cancel & Return to Catalog
                  </Link>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-4 border-t border-base-200 text-center">
                  <span className="text-[10px] uppercase tracking-widest text-base-content/40 font-bold block mb-3">
                    Guaranteed Safe & Secure Checkout
                  </span>
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <span className="badge badge-outline border-base-300 text-base-content/70 text-[11px] py-2 px-3 font-medium">bKash</span>
                    <span className="badge badge-outline border-base-300 text-base-content/70 text-[11px] py-2 px-3 font-medium">Nagad</span>
                    <span className="badge badge-outline border-base-300 text-base-content/70 text-[11px] py-2 px-3 font-medium">Rocket</span>
                    <span className="badge badge-outline border-base-300 text-base-content/70 text-[11px] py-2 px-3 font-medium">Cards</span>
                  </div>
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