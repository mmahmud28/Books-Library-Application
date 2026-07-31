import { getlibraribooks } from "@/lib/api/booksLoad";
import Image from "next/image";
import Link from "next/link";

const PublisherBooks = async ({ params }) => {

  const { publisherName } = await params;
  const publisher = decodeURIComponent(publisherName);
  const status = "active";

  const publisherBooks = (await getlibraribooks(publisher, status)) || [];

  const totalBooks = publisherBooks.length;
  const inStock = publisherBooks.filter((book) => book.stockQuantity > 0).length;
  const outStock = totalBooks - inStock;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans">

      {/* Dynamic Aurora & Neon Mesh Background */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-pink-600/25 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-10">

        {/* Hero Banner Section */}
        <div className="relative rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              Publisher Profile
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {publisher}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore the exclusive library collection published by{" "}
              <span className="text-indigo-300 font-semibold">{publisher}</span>.
              Streamlined for quick discovery and access.
            </p>
          </div>
        </div>

        {/* Compact Statistics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Total */}
          <div className="group relative rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-white/10 p-5 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-300 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Books</p>
              <h3 className="text-3xl font-black text-white mt-0.5">{totalBooks}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl text-indigo-300 group-hover:scale-110 transition-transform">
              📚
            </div>
          </div>

          {/* In Stock */}
          <div className="group relative rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-white/10 p-5 backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-300 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">In Stock</p>
              <h3 className="text-3xl font-black text-emerald-300 mt-0.5">{inStock}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl text-emerald-300 group-hover:scale-110 transition-transform">
              ✨
            </div>
          </div>

          {/* Out of Stock */}
          <div className="group relative rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-white/10 p-5 backdrop-blur-xl hover:border-rose-500/40 transition-all duration-300 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Out of Stock</p>
              <h3 className="text-3xl font-black text-rose-300 mt-0.5">{outStock}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-xl text-rose-300 group-hover:scale-110 transition-transform">
              ⚠️
            </div>
          </div>

        </div>

        {/* Books Section */}
        {publisherBooks.length === 0 ? (
          <div className="rounded-3xl bg-slate-900/30 border border-white/10 p-12 text-center backdrop-blur-xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800/60 border border-white/10 flex items-center justify-center text-3xl mb-3">
              🔍
            </div>
            <h2 className="text-xl font-bold text-white">No Books Found</h2>
            <p className="text-slate-400 text-xs mt-1">There are no active records for this publisher right now.</p>
          </div>
        ) : (
          /* Horizontal Glass Card Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {publisherBooks.map((book) => (
              <div
                key={book._id}
                className="group relative rounded-2xl bg-slate-900/40 border border-white/10 hover:border-indigo-500/40 backdrop-blur-xl p-4 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col sm:flex-row gap-4 items-center overflow-hidden"
              >
                {/* Book Image Frame */}
                <div className="relative w-full sm:w-36 h-48 sm:h-full min-h-[160px] flex-shrink-0 rounded-xl overflow-hidden bg-slate-950/60 border border-white/5 flex items-center justify-center">
                  {book.coverImage ? (
                    <Image
                      src={book.coverImage}
                      alt={book.title || "Book Cover"}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-4xl opacity-20">📘</span>
                  )}

                  {/* Category Pill on Image */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-950/80 border border-white/10 text-indigo-300 backdrop-blur-md">
                      {book.category || "General"}
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 flex flex-col justify-between w-full h-full space-y-3">
                  <div>
                    {/* Header + Stock */}
                    <div className="flex justify-between items-start gap-2">
                      <h3
                        className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors line-clamp-1"
                        title={book.title}
                      >
                        {book.title}
                      </h3>

                      {book.stockQuantity > 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                          {book.stockQuantity} In Stock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 whitespace-nowrap">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-medium text-slate-400 mt-0.5">
                      Author: <span className="text-slate-200">{book.author || "Unknown"}</span>
                    </p>

                    {/* Metadata Grid (Compact Specs) */}
                    <div className="grid grid-cols-3 gap-2 text-[11px] bg-slate-950/40 p-2.5 rounded-xl border border-white/5 mt-3">
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Language</span>
                        <span className="font-semibold text-slate-200 truncate block">{book.language || "English"}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Published</span>
                        <span className="font-semibold text-slate-200 truncate block">{book.publishedYear || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Condition</span>
                        <span className="font-semibold text-slate-200 truncate block">{book.condition || "Good"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-end">
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
        )}

      </div>
    </div>
  );
};

export default PublisherBooks;
