'use client';

import React, { useState } from 'react';
import { Search, Filter, BookX, RotateCcw, SlidersHorizontal } from 'lucide-react';
import BooksGrid from '@/app/Components/BooksGrid';
import PublicBooksGrid from './PublicBooksGrid';

const PublicBooksHeaderAndFilters = ({ initialBooks = [], categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  // Dynamic Filtering Logic
  const filteredBooks = initialBooks.filter((book) => {
    const matchesSearch =
      book?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book?.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book?.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || book?.category === selectedCategory;

    const qty = Number(book?.stockQuantity) || 0;
    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'inStock' && qty > 0) ||
      (stockFilter === 'outStock' && qty <= 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setStockFilter('all');
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Toolbar */}
      <div className="bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800 backdrop-blur-md space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="বইয়ের নাম, লেখক বা ক্যাটাগরি দিয়ে খুঁজুন..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Dropdown Filters & Reset Button */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            
            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-slate-200 focus:outline-none cursor-pointer pr-2"
                >
                  <option value="all" className="bg-slate-900 text-slate-200">
                    সমস্ত ক্যাটাগরি
                  </option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat} className="bg-slate-900 text-slate-200">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Stock Filter */}
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer pr-2"
              >
                <option value="all" className="bg-slate-900 text-slate-200">
                  সকল স্ট্যাটাস
                </option>
                <option value="inStock" className="bg-slate-900 text-emerald-400">
                  In Stock
                </option>
                <option value="outStock" className="bg-slate-900 text-rose-400">
                  Out of Stock
                </option>
              </select>
            </div>

            {/* Reset Filter Button */}
            {(searchTerm || selectedCategory !== 'all' || stockFilter !== 'all') && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-xl text-xs font-semibold transition-all shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                রিসেট
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
          <span>
            দেখাচ্ছে: <strong className="text-indigo-400 font-bold">{filteredBooks.length}</strong> টি বই
          </span>
          {filteredBooks.length !== initialBooks.length && (
            <span className="text-slate-500">
              (মোট {initialBooks.length} টি বই থেকে ফিল্টার করা হয়েছে)
            </span>
          )}
        </div>
      </div>

      {/* Render Books Grid or Empty State */}
      {filteredBooks.length > 0 ? (
        <PublicBooksGrid books={filteredBooks} />
      ) : (
        <div className="backdrop-blur-xl bg-slate-900/30 border border-dashed border-slate-800 text-center py-20 rounded-2xl space-y-3">
          <BookX className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
          <h2 className="text-lg font-bold text-slate-300">কোনো বই পাওয়া যায়নি</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            আপনার অনুসন্ধানের সাথে মেলে এমন কোনো বই পাওয়া যায়নি। অন্য কিওয়ার্ড বা ফিল্টার দিয়ে আবার চেষ্টা করুন।
          </p>
          <button
            onClick={handleReset}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-indigo-600/30"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            ফিল্টার রিসেট করুন
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicBooksHeaderAndFilters;