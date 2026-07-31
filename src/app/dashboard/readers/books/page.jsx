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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="group backdrop-blur-xl bg-slate-900/50 border border-white/10 rounded-2xl p-4 shadow-2xl hover:bg-slate-900/70 hover:border-indigo-500/30 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center"
            >
              {/* Image Container */}
              <div className="relative w-full sm:w-44 h-56 sm:h-full min-h-[180px] flex-shrink-0 rounded-xl overflow-hidden bg-slate-800/60 border border-white/5">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>

              {/* Book Info */}
              <div className="flex-1 flex flex-col justify-between w-full h-full">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-lg font-bold text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">
                      {book.title}
                    </h2>
                    {Number(book.stockQuantity) > 0 ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium whitespace-nowrap">
                        {book.stockQuantity} In Stock
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium whitespace-nowrap">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs font-medium text-slate-400 mb-3">
                    By <span className="text-slate-200">{book.author}</span>
                  </p>

                  {/* Compact Specs Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Publisher</span>
                      <span className="font-medium text-slate-200 truncate block">{book.publisher || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Category</span>
                      <span className="font-medium text-slate-200 truncate block">{book.category || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Language</span>
                      <span className="font-medium text-slate-200 truncate block">{book.languages || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">Published</span>
                      <span className="font-medium text-slate-200 truncate block">{book.publishedYear || "N/A"}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
                    Added: <span className="text-slate-300">{book.addedBy}</span>
                  </span>
                  <Link
                    href={`/dashboard/readers/books/${book._id}`}
                    className="px-4 py-1.5 text-xs rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

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