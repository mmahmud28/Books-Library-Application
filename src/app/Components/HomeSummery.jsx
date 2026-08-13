import { publicStats } from '@/lib/api/booksLoad';
import React from 'react';
import { 
  BookOpen, 
  Users, 
  ShoppingCart, 
  Banknote, 
  Truck, 
  CreditCard, 
  Star, 
  Sparkles, 
  Calendar, 
  Award,
  BookMarked,
  UserCheck,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';

const HomeSummery = async () => {
  const response = await publicStats();
  const data = response?.metrics ? response : null;

  if (!data) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-6">
        <div className="alert alert-error shadow-2xl max-w-md border border-error/20 bg-error/10 text-error backdrop-blur-md">
          <span>Failed to load library analytics data. Please try again later.</span>
        </div>
      </div>
    );
  }

  const { metrics, showcase } = data;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* ================= HERO & IMPACT SUMMARY SECTION ================= */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/20 p-8 sm:p-12 shadow-2xl shadow-indigo-950/50 group">
          {/* Glowing Ambient Background Effect */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-4xl">
            <div className="badge badge-primary badge-outline gap-2 p-3.5 font-bold uppercase tracking-wider text-xs bg-indigo-500/10 border-indigo-500/30 text-indigo-400 backdrop-blur-md">
              <Sparkles className="w-4 h-4 animate-pulse text-indigo-400" />
              Live Impact & Performance Analytics
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Empowering Knowledge with <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-pink-400 bg-clip-text text-transparent">BiblioDrop</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-md shadow-inner">
              Over the last <span className="text-indigo-400 font-bold">{metrics.platformActiveDays} days</span>, 
              BiblioDrop has successfully delivered over <span className="text-emerald-400 font-bold">{metrics.completedOrders}+ books</span> to readers across the community. With a <span className="text-sky-400 font-bold">{metrics.deliverySuccessRate} delivery success rate</span> and a stellar <span className="text-amber-400 font-bold">{metrics.averageRating}★ average rating</span>, we remain committed to sparking the joy of reading everywhere.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="badge badge-lg bg-slate-900/80 border-slate-800 text-slate-300 gap-2 p-4 font-semibold shadow-md">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Active Operating Days: <strong className="text-white">{metrics.platformActiveDays} Days</strong></span>
              </div>
              <div className="badge badge-lg bg-slate-900/80 border-slate-800 text-slate-300 gap-2 p-4 font-semibold shadow-md">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Success Rate: <strong className="text-emerald-400">{metrics.deliverySuccessRate}</strong></span>
              </div>
              <div className="badge badge-lg bg-slate-900/80 border-slate-800 text-slate-300 gap-2 p-4 font-semibold shadow-md">
                <HeartHandshake className="w-4 h-4 text-pink-400" />
                <span>Satisfaction: <strong className="text-pink-400">{metrics.averageRating} / 5.0 Rating</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PRIMARY STATS (DaisyUI Enhanced Stats) ================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-7 bg-indigo-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Core Platform Metrics</h2>
          </div>

          <div className="stats stats-vertical lg:stats-horizontal shadow-2xl bg-slate-900/80 border border-slate-800/80 w-full rounded-3xl backdrop-blur-md divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {/* Stat 1 */}
            <div className="stat p-6 hover:bg-slate-800/40 transition-colors duration-300 group">
              <div className="stat-figure text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-9 h-9" />
              </div>
              <div className="stat-title text-xs font-semibold uppercase text-slate-400 tracking-wider">Total Collection</div>
              <div className="stat-value text-indigo-400 my-1 text-4xl font-extrabold">{metrics.totalBooks}</div>
              <div className="stat-desc text-slate-400 font-medium">Available: <span className="text-slate-200">{metrics.activeBooks} Books</span></div>
            </div>

            {/* Stat 2 */}
            <div className="stat p-6 hover:bg-slate-800/40 transition-colors duration-300 group">
              <div className="stat-figure text-sky-400 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-9 h-9" />
              </div>
              <div className="stat-title text-xs font-semibold uppercase text-slate-400 tracking-wider">Registered Readers</div>
              <div className="stat-value text-sky-400 my-1 text-4xl font-extrabold">{metrics.totalUsers}</div>
              <div className="stat-desc text-slate-400 font-medium">Librarians: <span className="text-slate-200">{metrics.totalLibrarians} Active</span></div>
            </div>

            {/* Stat 3 */}
            <div className="stat p-6 hover:bg-slate-800/40 transition-colors duration-300 group">
              <div className="stat-figure text-amber-400 group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-9 h-9" />
              </div>
              <div className="stat-title text-xs font-semibold uppercase text-slate-400 tracking-wider">Total Orders</div>
              <div className="stat-value text-amber-400 my-1 text-4xl font-extrabold">{metrics.totalOrders}</div>
              <div className="stat-desc text-slate-400 font-medium">Completed: <span className="text-slate-200">{metrics.completedOrders} Orders</span></div>
            </div>

            {/* Stat 4 */}
            <div className="stat p-6 hover:bg-slate-800/40 transition-colors duration-300 group">
              <div className="stat-figure text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <Banknote className="w-9 h-9" />
              </div>
              <div className="stat-title text-xs font-semibold uppercase text-slate-400 tracking-wider">Total Circulation Value</div>
              <div className="stat-value text-emerald-400 my-1 text-4xl font-extrabold">৳{metrics.totalSales}</div>
              <div className="stat-desc text-slate-400 font-medium">Paid Orders: <span className="text-slate-200">{metrics.successfulPaidOrders} Transactions</span></div>
            </div>
          </div>
        </section>

        {/* ================= SECONDARY HIGHLIGHT CARDS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="card bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shadow-lg hover:border-emerald-500/40 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 flex-row items-center justify-between group">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Inventory</p>
              <p className="text-2xl font-black text-white">{metrics.activeBooks}</p>
              <span className="badge badge-success badge-sm text-[10px] font-bold">In Stock</span>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform duration-300">
              <BookMarked className="w-6 h-6" />
            </div>
          </div>

          <div className="card bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shadow-lg hover:border-sky-500/40 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 flex-row items-center justify-between group">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Delivered Orders</p>
              <p className="text-2xl font-black text-white">{metrics.deliveredOrders}</p>
              <span className="badge badge-info badge-sm text-[10px] font-bold">Successful</span>
            </div>
            <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 group-hover:scale-110 transition-transform duration-300">
              <Truck className="w-6 h-6" />
            </div>
          </div>

          <div className="card bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shadow-lg hover:border-indigo-500/40 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 flex-row items-center justify-between group">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Paid Transactions</p>
              <p className="text-2xl font-black text-white">{metrics.successfulPaidOrders}</p>
              <span className="badge badge-primary badge-sm text-[10px] font-bold">Verified</span>
            </div>
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform duration-300">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>

          <div className="card bg-slate-900/60 border border-slate-800 p-5 rounded-2xl shadow-lg hover:border-amber-500/40 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 flex-row items-center justify-between group">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Community Rating</p>
              <p className="text-2xl font-black text-white">{metrics.averageRating} ★</p>
              <span className="badge badge-warning badge-sm text-[10px] font-bold">{metrics.totalReviews} Total Reviews</span>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
          </div>
        </section>

        {/* ================= TOP ORDERED BOOKS SHOWCASE ================= */}
        {showcase?.topOrderedBooks && showcase.topOrderedBooks.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-7 bg-pink-500 rounded-full" />
              <h2 className="text-2xl font-bold text-white tracking-tight">🏆 Most Popular & Borrowed Books</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {showcase.topOrderedBooks.map((book) => (
                <div 
                  key={book._id} 
                  className="card card-side bg-slate-900/70 border border-slate-800 rounded-2xl p-4 shadow-xl hover:border-indigo-500/40 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <figure className="w-24 h-32 rounded-xl bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-700/50 group-hover:scale-105 transition-transform duration-300">
                    {book.coverImage ? (
                      <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                      <BookOpen className="w-10 h-10 text-slate-600" />
                    )}
                  </figure>
                  <div className="card-body p-4 justify-between min-w-0">
                    <div className="space-y-1">
                      <span className="badge badge-secondary badge-outline text-[10px] font-bold uppercase tracking-wider">
                        {book.category}
                      </span>
                      <h3 className="card-title text-base text-white font-bold truncate group-hover:text-indigo-400 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-400 truncate">Author: {book.author}</p>
                    </div>
                    <div className="badge bg-slate-800 border-slate-700 text-slate-300 text-xs gap-1.5 p-3 font-semibold">
                      <ShoppingCart className="w-3.5 h-3.5 text-pink-400" />
                      <span>{book.totalOrders} Borrows</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= RECENT PUBLIC REVIEWS ================= */}
        {showcase?.recentReviews && showcase.recentReviews.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-7 bg-amber-500 rounded-full" />
              <h2 className="text-2xl font-bold text-white tracking-tight">💬 Recent Reader Testimonials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {showcase.recentReviews.map((rev) => (
                <div 
                  key={rev._id} 
                  className="card bg-slate-900/60 border border-slate-800 rounded-2xl shadow-xl hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-300"
                >
                  <div className="card-body p-6 justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="rating rating-xs gap-1">
                          {[...Array(5)].map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`w-4 h-4 ${idx < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-800'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed italic line-clamp-4">
                        "{rev.reviewText}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
                      <div className="avatar">
                        <div className="w-9 h-9 rounded-full ring-2 ring-indigo-500/40">
                          <img src={rev.userImage} alt={rev.userName} />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{rev.userName}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Verified Reader</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default HomeSummery;