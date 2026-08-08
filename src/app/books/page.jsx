import BooksGrid from "@/app/Components/BooksGrid";
import BooksHeaderAndFilters from "@/app/Components/BooksHeaderAndFilters";
import { getAllBooks } from "@/lib/api/booksLoad";
import { BookOpen, CheckCircle2, XCircle, Sparkles, Library } from "lucide-react";
import PublicBooksHeaderAndFilters from "../Components/PublicBooksHeaderAndFilters";

const BooksPage = async () => {
  const books = (await getAllBooks()) || [];

  const totalBooks = books.length;
  const inStock = books.filter(
    (book) => Number(book.stockQuantity) > 0
  ).length;
  const outStock = totalBooks - inStock;

  // Categories 추출 for Filter Option
  const categories = Array.from(
    new Set(books.map((b) => b.category).filter(Boolean))
  );

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Glassmorphism Ambient Glows */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-emerald-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Grid Overlay for Tech Look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* Top Header Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                <Library className="w-6 h-6" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                বইয়ের ডিজিটাল লাইব্রেরি
              </h1>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              সংগ্রহে থাকা সমস্ত বই ব্রাউজ করুন, স্টক ফিল্টার করুন এবং সহজেই আপনার পছন্দের বইটি বেছে নিন।
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl backdrop-blur-md self-start md:self-auto">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span className="text-xs font-semibold text-slate-300">
              লাইব্রেরি ক্যাটালগ
            </span>
          </div>
        </div>

        {/* Dynamic Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Total Books Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/50 p-6 border border-indigo-500/20 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Total Collection</span>
                <h2 className="text-4xl font-black text-white mt-2">{totalBooks}</h2>
                <p className="text-[11px] text-slate-400 mt-1">মোট সংরক্ষিত বই</p>
              </div>
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
            </div>
          </div>

          {/* In Stock Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/50 p-6 border border-emerald-500/20 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Available Books</span>
                <h2 className="text-4xl font-black text-white mt-2">{inStock}</h2>
                <p className="text-[11px] text-slate-400 mt-1">ধার নেওয়ার জন্য প্রস্তুত</p>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-7 h-7" />
              </div>
            </div>
          </div>

          {/* Out of Stock Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-slate-900/50 p-6 border border-rose-500/20 backdrop-blur-xl transition-all duration-300 hover:border-rose-500/40 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">Out of Stock</span>
                <h2 className="text-4xl font-black text-white mt-2">{outStock}</h2>
                <p className="text-[11px] text-slate-400 mt-1">বর্তমানে স্টক খালি</p>
              </div>
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl group-hover:scale-110 transition-transform">
                <XCircle className="w-7 h-7" />
              </div>
            </div>
          </div>
        </div>

        {/* Client Side Search, Filter & Books Container */}
        <PublicBooksHeaderAndFilters initialBooks={books} categories={categories} />

      </div>
    </div>
  );
};

export default BooksPage;