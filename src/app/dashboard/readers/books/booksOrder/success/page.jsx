import { getBorrowRequestById, updateBorrowRequest } from "@/lib/api/booksOrder";
import Link from "next/link";
import {
  Check,
  AlertCircle,
  FileText,
  Calendar,
  BookOpen,
  User,
  Phone,
  Mail,
  MapPin,
  Search,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const SuccessPage = async ({ searchParams }) => {
  const { orderId } = await searchParams;

  if (orderId) {
    await updateBorrowRequest(orderId, {
      paymentStatus: "paid",
      borrowStatus: "pending",
    });
  }

  const getOrderBooks = await getBorrowRequestById(orderId);

  if (!getOrderBooks) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center p-4">
        <div className="alert alert-error max-w-md shadow-2xl rounded-2xl border border-red-500/30 bg-red-950/20 backdrop-blur-xl text-red-200 flex items-center gap-3">
          <AlertCircle className="w-8 h-8 text-red-400 shrink-0" />
          <div>
            <h3 className="font-bold text-lg">ত্রুটি!</h3>
            <p className="text-sm">দুঃখিত, এই অর্ডারটি সিস্টেমে খুঁজে পাওয়া যায়নি।</p>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(getOrderBooks.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#0a0f1e] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* গ্লো ইফেক্টস */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl w-full relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        {/* গ্লাস-মর্ফিজম মেইন কার্ড */}
        <div className="card bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] border border-white/10 rounded-3xl overflow-hidden">
          
          {/* হেডার সেকশন */}
          <div className="bg-gradient-to-br from-emerald-950/80 via-emerald-900/60 to-[#0a0f1e]/20 p-10 text-center border-b border-white/5 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-base-100/5 backdrop-blur-md text-emerald-400 rounded-full shadow-inner border border-emerald-500/30 mb-6 transition-transform hover:scale-105">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
                পেমেন্ট সফল হয়েছে! <Sparkles className="w-6 h-6 text-emerald-400" />
              </h1>
              <p className="text-emerald-300 text-lg mt-3 font-medium max-w-md mx-auto opacity-90">
                দারুণ! আপনার বই ধার নেওয়ার অনুরোধটি নিশ্চিত করা হয়েছে।
              </p>
            </div>
          </div>

          <div className="card-body p-8 sm:p-10 space-y-8 text-neutral-300">
            
            {/* অর্ডারের প্রাথমিক তথ্য */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                <div className="p-3 bg-emerald-950/50 rounded-xl text-emerald-400 border border-emerald-500/20">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">অর্ডার আইডি</p>
                  <p className="font-mono text-sm font-bold text-neutral-100 bg-neutral-800/50 px-2 py-0.5 rounded mt-1 border border-neutral-700">
                    #{getOrderBooks._id.slice(-10)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                <div className="p-3 bg-teal-950/50 rounded-xl text-teal-400 border border-teal-500/20">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">লেনদেনের তারিখ</p>
                  <p className="font-semibold text-neutral-100 text-base mt-1">{formattedDate}</p>
                </div>
              </div>
            </div>

            {/* স্ট্যাটাস সেকশন */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/[0.01] border border-white/5 p-6 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-neutral-400">পেমেন্ট স্ট্যাটাস:</span>
                <span className="badge badge-success bg-emerald-500 text-emerald-950 font-bold px-4 py-3 rounded-full text-xs uppercase tracking-wider">
                  {getOrderBooks.paymentStatus}
                </span>
              </div>
              <div className="hidden sm:block text-neutral-700">|</div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-warning rounded-full animate-pulse"></div>
                <span className="text-sm text-neutral-400">অনুরোধের অবস্থা:</span>
                <span className="badge badge-warning text-warning-content font-bold px-4 py-3 rounded-full text-xs uppercase tracking-wider capitalize">
                  {getOrderBooks.borrowStatus}
                </span>
              </div>
            </div>

            {/* ধারের বিবরণ */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-white/5 bg-white/[0.01]">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                  বই ও ধারের বিবরণ
                </h3>
              </div>
              
              <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-5 text-sm relative">
                <div className="absolute inset-y-6 left-1/2 -translate-x-1/2 border-l border-dashed border-neutral-700 hidden sm:block"></div>

                <div className="space-y-4">
                  <InfoItem label="ধারের মেয়াদ" value={`${getOrderBooks.borrowDays} দিন`} />
                  <InfoItem label="বুক আইডি" value={getOrderBooks.bookId} isMono />
                </div>
                <div className="space-y-4 col-span-2 sm:col-span-1">
                  <InfoItem label="লাইব্রেরি আইডি" value={getOrderBooks.libraryId} isMono />
                  {getOrderBooks.notes && <InfoItem label="বিশেষ নোট" value={getOrderBooks.notes} isItalic />}
                </div>
              </div>
            </div>

            {/* গ্রাহকের তথ্য */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 px-1">গ্রাহকের তথ্য</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/[0.01] border border-white/5 p-6 rounded-2xl">
                <ContactItem label="নাম" value={getOrderBooks.borrowerName} icon={<User className="w-4 h-4" />} />
                <ContactItem label="ফোন নম্বর" value={getOrderBooks.phone} icon={<Phone className="w-4 h-4" />} />
                <ContactItem label="ইমেইল এড্রেস" value={getOrderBooks.email} icon={<Mail className="w-4 h-4" />} />
                <ContactItem label="ঠিকানা" value={getOrderBooks.address} icon={<MapPin className="w-4 h-4" />} />
              </div>
            </div>

            {/* নেভিগেশন বাটন */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard/readers/books"
                className="btn border-none bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex-1 h-14 rounded-xl font-bold text-base shadow-[0_4px_15px_0_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_0_rgba(16,185,129,0.5)] transition-all duration-300 group flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                আরও বই খুঁজুন
              </Link>
              
              <Link
                href="/dashboard/readers/my-orders"
                className="btn btn-outline btn-neutral flex-1 h-14 rounded-xl font-semibold border-white/10 text-neutral-300 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                আমার অর্ডারসমূহ দেখুন
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
          
          <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600"></div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, isMono = false, isItalic = false }) => (
  <div>
    <span className="text-xs text-neutral-500 block mb-0.5">{label}</span>
    <span className={`${isMono ? 'font-mono text-xs bg-neutral-800/60 px-1.5 py-0.5 rounded border border-neutral-700/50 text-neutral-200' : 'font-semibold text-neutral-100 text-base'} ${isItalic ? 'italic text-neutral-400' : ''}`}>
      {value}
    </span>
  </div>
);

const ContactItem = ({ label, value, icon }) => (
  <div className="flex items-start gap-3.5">
    <div className="p-2 bg-neutral-800 rounded-lg text-neutral-400 mt-0.5 border border-neutral-700/50">
      {icon}
    </div>
    <div className="flex-1">
      <span className="text-xs text-neutral-500 block">{label}</span>
      <span className="font-medium text-neutral-200 text-sm break-all">{value}</span>
    </div>
  </div>
);

export default SuccessPage;