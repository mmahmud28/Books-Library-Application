import BooksGrid from "@/app/Components/BooksGrid";
import { getAllBooks } from "@/lib/api/booksLoad";
import Image from "next/image";
import Link from "next/link";

const BooksPage = async () => {
  const books = (await getAllBooks()) || [];

  const totalBooks = books.length;
  const inStock = books.filter(
    (book) => Number(book.stockQuantity) > 0
  ).length;
  const outStock = totalBooks - inStock;

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 overflow-hidden">
      
      {/* Dark Glassmorphism Ambient Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-emerald-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="backdrop-blur-xl bg-slate-900/40 border border-indigo-500/20 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Total Books</span>
            <h2 className="text-4xl font-extrabold text-indigo-400 mt-2">{totalBooks}</h2>
          </div>

          <div className="backdrop-blur-xl bg-slate-900/40 border border-emerald-500/20 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">In Stock</span>
            <h2 className="text-4xl font-extrabold text-emerald-400 mt-2">{inStock}</h2>
          </div>

          <div className="backdrop-blur-xl bg-slate-900/40 border border-rose-500/20 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">Out of Stock</span>
            <h2 className="text-4xl font-extrabold text-rose-400 mt-2">{outStock}</h2>
          </div>
        </div>

        

        {/* Books Grid - Horizontal Style */}
        
        <BooksGrid books={books} />

        {/* Empty State */}
        {books.length === 0 && (
          <div className="backdrop-blur-xl bg-slate-900/40 border border-white/10 text-center py-16 rounded-2xl">
            <h2 className="text-xl font-bold text-slate-200">No Books Available</h2>
            <p className="text-sm text-slate-400 mt-1">Check back later or add new books.</p>
          </div>
        )}

      </div>
    </div>
  );
};
// Add ALl Books Page

export default BooksPage;