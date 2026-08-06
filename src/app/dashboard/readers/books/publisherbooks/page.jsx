import Image from "next/image";
import Link from "next/link";
import { allLibrarianList } from "@/lib/api/librainBooksLoad";
import { 
  Users, 
  BookOpen, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  SearchX
} from "lucide-react";

const AllLibrarianList = async () => {
  const librarianList = await allLibrarianList();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Librarian Directory
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              All Librarians
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              লাইব্রেরিয়ানদের তথ্য পরিচালনা করুন এবং তাদের আপলোড করা বইসমূহ দেখুন।
            </p>
          </div>

          {/* Stats Card */}
          <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800/80 px-5 py-3.5 rounded-2xl backdrop-blur-xl shadow-lg">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">সর্বমোট লাইব্রেরিয়ান</p>
              <h3 className="text-2xl font-extrabold text-white">{librarianList.length}</h3>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {librarianList.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 backdrop-blur-md">
            <div className="w-16 h-16 bg-slate-800/80 text-slate-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700/50">
              <SearchX className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-200">কোনো লাইব্রেরিয়ান পাওয়া যায়নি</h2>
            <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
              এই মুহূর্তে সিস্টেমে কোনো নিবন্ধিত লাইব্রেরিয়ান নেই।
            </p>
          </div>
        ) : (
          /* Custom Styled Table Grid */
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 text-xs font-semibold tracking-wider uppercase">
                    <th className="py-4 px-6 text-center w-16">#</th>
                    <th className="py-4 px-6">লাইব্রেরিয়ান</th>
                    <th className="py-4 px-6">যোগাযোগ</th>
                    <th className="py-4 px-6">রোল</th>
                    <th className="py-4 px-6">যোগদানের তারিখ</th>
                    <th className="py-4 px-6 text-center">অ্যাকশন</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {librarianList.map((librarian, index) => (
                    <tr 
                      key={librarian._id} 
                      className="group hover:bg-slate-900/80 transition-all duration-300"
                    >
                      {/* Serial */}
                      <td className="py-4 px-6 text-center font-mono font-bold text-slate-500 group-hover:text-indigo-400 transition-colors">
                        {String(index + 1).padStart(2, '0')}
                      </td>

                      {/* Profile Details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative group-hover:scale-105 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-indigo-500/30 group-hover:ring-indigo-500/80 transition-all bg-slate-800 relative">
                              <Image
                                src={librarian?.image || "/default-avatar.png"}
                                alt={librarian?.name || "Librarian"}
                                fill
                                sizes="48px"
                                className="object-cover"
                                unoptimized={librarian?.image?.startsWith("http")}
                              />
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
                          </div>

                          <div>
                            <div className="font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                              {librarian.name}
                            </div>
                            <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                              ID: #{librarian._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-4 px-6 space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{librarian.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{librarian.phone || 'N/A'}</span>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {librarian.role}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-6 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {librarian.createdAt ? new Date(librarian.createdAt).toLocaleDateString('bn-BD', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          }) : 'N/A'}
                        </div>
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-6 text-center">
                        <Link
                          href={`/dashboard/readers/books/publisherbooks/${encodeURIComponent(librarian.name)}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-95"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>বইসমূহ দেখুন</span>
                          <ChevronRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLibrarianList;