"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaTrash,
    FaEye,
    FaBook,
    FaBookOpen,
    FaClock,
    FaExclamationTriangle,
    FaSearch,
} from "react-icons/fa";

export default function BookManagementView({ initialBooks }) {
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    // ফিল্টার লজিক
    const filteredBooks = initialBooks.filter((book) => {
        const matchesTab =
            activeTab === "all"
                ? true
                : activeTab === "active"
                    ? book.status === "active"
                    : activeTab === "pending"
                        ? book.status === "Pending Approval"
                        : book.status === "inactive";

        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.category.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesTab && matchesSearch;
    });

    // স্ট্যাটাস ভিত্তিক গণনা
    const counts = {
        all: initialBooks.length,
        active: initialBooks.filter((b) => b.status === "active").length,
        pending: initialBooks.filter((b) => b.status === "Pending Approval").length,
        inactive: initialBooks.filter((b) => b.status === "inactive").length,
    };

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8 animate-fadeIn">
            {/* Top Header & Quick Stats */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-base-100 p-6 rounded-3xl border border-base-200 shadow-sm">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                            <FaBookOpen className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
                                Book Management
                            </h1>
                            <p className="text-sm text-base-content/60 mt-0.5">
                                Monitor stock, manage categories, and approve new submissions
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dynamic Stats Pill */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-base-200/50 p-3 px-4 rounded-2xl border border-base-200 text-center">
                        <span className="text-xs font-semibold text-base-content/60 uppercase">Total</span>
                        <p className="text-2xl font-bold text-primary">{counts.all}</p>
                    </div>
                    <div className="bg-success/10 p-3 px-4 rounded-2xl border border-success/20 text-center">
                        <span className="text-xs font-semibold text-success uppercase">Active</span>
                        <p className="text-2xl font-bold text-success">{counts.active}</p>
                    </div>
                    <div className="bg-warning/10 p-3 px-4 rounded-2xl border border-warning/20 text-center">
                        <span className="text-xs font-semibold text-warning-content uppercase">Pending</span>
                        <p className="text-2xl font-bold text-warning">{counts.pending}</p>
                    </div>
                    <div className="bg-error/10 p-3 px-4 rounded-2xl border border-error/20 text-center">
                        <span className="text-xs font-semibold text-error uppercase">Inactive</span>
                        <p className="text-2xl font-bold text-error">{counts.inactive}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Controls: Tabs & Search Input */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-base-300 pb-4">
                {/* Custom Premium Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === "all"
                                ? "bg-primary text-primary-content shadow-lg shadow-primary/25 scale-[1.02]"
                                : "bg-base-100 text-base-content/70 hover:bg-base-200 hover:text-base-content"
                            }`}
                    >
                        <FaBook className="w-4 h-4" />
                        All Books
                        <span className="badge badge-sm border-0 bg-base-100/20 text-current font-bold">
                            {counts.all}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab("active")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === "active"
                                ? "bg-success text-success-content shadow-lg shadow-success/25 scale-[1.02]"
                                : "bg-base-100 text-base-content/70 hover:bg-base-200 hover:text-base-content"
                            }`}
                    >
                        <FaCheckCircle className="w-4 h-4" />
                        Active
                        <span className="badge badge-sm border-0 bg-base-100/20 text-current font-bold">
                            {counts.active}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab("pending")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === "pending"
                                ? "bg-warning text-warning-content shadow-lg shadow-warning/25 scale-[1.02]"
                                : "bg-base-100 text-base-content/70 hover:bg-base-200 hover:text-base-content"
                            }`}
                    >
                        <FaClock className="w-4 h-4" />
                        Pending Approval
                        <span className="badge badge-sm border-0 bg-base-100/20 text-current font-bold">
                            {counts.pending}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab("inactive")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${activeTab === "inactive"
                                ? "bg-error text-error-content shadow-lg shadow-error/25 scale-[1.02]"
                                : "bg-base-100 text-base-content/70 hover:bg-base-200 hover:text-base-content"
                            }`}
                    >
                        <FaExclamationTriangle className="w-4 h-4" />
                        Inactive
                        <span className="badge badge-sm border-0 bg-base-100/20 text-current font-bold">
                            {counts.inactive}
                        </span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative min-w-[280px]">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search book, author, category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full pl-11 text-white rounded-2xl bg-base-100 focus:outline-none focus:border-primary transition-all text-sm"
                    />
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-base-100 rounded-3xl shadow-xl border border-base-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Header */}
                        <thead className="bg-base-200/60 text-base-content/70 uppercase text-xs tracking-wider border-b border-base-200">
                            <tr>
                                <th className="py-5 px-6">#</th>
                                <th>Book Details</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Stock Status</th>
                                <th>Uploaded By</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-base-200 text-sm">
                            {filteredBooks.length > 0 ? (
                                filteredBooks.map((book, index) => (
                                    <tr
                                        key={book._id}
                                        className={`transition-all duration-200 hover:bg-base-200/40 ${book.status === "Pending Approval"
                                                ? "bg-warning/5"
                                                : ""
                                            }`}
                                    >
                                        <td className="py-4 px-6 font-semibold text-base-content/40">
                                            {(index + 1).toString().padStart(2, "0")}
                                        </td>

                                        {/* Book Cover + Info */}
                                        <td>
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-14 h-20 overflow-hidden rounded-xl shadow-md ring-1 ring-base-300 shrink-0">
                                                    <Image
                                                        src={book.coverImage || "/placeholder.png"}
                                                        alt={book.title || "Book Cover"}
                                                        fill
                                                        sizes="56px"
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <h3 className="font-bold text-base text-base-content line-clamp-1 hover:text-primary transition-colors cursor-pointer">
                                                        {book.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-xs text-base-content/60">
                                                        <span className="badge badge-ghost badge-sm font-normal">
                                                            {book.languages || "N/A"}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{book.publishedYear}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Author */}
                                        <td className="font-medium text-base-content/80">
                                            {book.author}
                                        </td>

                                        {/* Category */}
                                        <td>
                                            <span className="badge badge-neutral text-white badge-outline font-medium text-xs px-3 py-2">
                                                {book.category}
                                            </span>
                                        </td>

                                        {/* Stock */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`font-bold text-sm ${book.stockQuantity < 5
                                                            ? "text-error"
                                                            : "text-base-content/80"
                                                        }`}
                                                >
                                                    {book.stockQuantity}
                                                </span>
                                                <span className="text-xs text-base-content/50">copies</span>
                                            </div>
                                        </td>

                                        {/* Uploader */}
                                        <td className="text-base-content/70 font-medium text-xs">
                                            {book.addedBy || "Admin"}
                                        </td>

                                        {/* Status Badge */}
                                        <td>
                                            <span
                                                className={`badge badge-sm font-semibold py-2 px-3 gap-1 capitalize ${book.status === "active"
                                                        ? "badge-success text-success-content"
                                                        : book.status === "Pending Approval"
                                                            ? "badge-warning text-warning-content animate-pulse"
                                                            : "badge-error text-error-content"
                                                    }`}
                                            >
                                                {book.status}
                                            </span>
                                        </td>

                                        {/* Actions Dropdown / Buttons */}
                                        <td>
                                            <div className="flex justify-center items-center gap-1.5">
                                                {book.status === "Pending Approval" && (
                                                    <>
                                                        <button
                                                            className="btn btn-circle btn-ghost btn-xs text-success hover:bg-success/15 tooltip"
                                                            data-tip="Approve Book"
                                                        >
                                                            <FaCheckCircle className="w-4 h-4" />
                                                        </button>

                                                        <button
                                                            className="btn btn-circle btn-ghost btn-xs text-warning hover:bg-warning/15 tooltip"
                                                            data-tip="Reject Book"
                                                        >
                                                            <FaTimesCircle className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}

                                                <Link
                                                    href={`/dashboard/admin/books/${book._id}`}
                                                    className="btn btn-circle btn-ghost btn-xs text-info hover:bg-info/15 tooltip"
                                                    data-tip="View Details"
                                                >
                                                    <FaEye className="w-4 h-4" />
                                                </Link>

                                                <button
                                                    className="btn btn-circle btn-ghost btn-xs text-error hover:bg-error/15 tooltip"
                                                    data-tip="Delete Book"
                                                >
                                                    <FaTrash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-16 text-base-content/50">
                                        <div className="flex flex-col items-center gap-3">
                                            <FaBookOpen className="w-10 h-10 opacity-20" />
                                            <p className="text-base font-medium">
                                                No books match your current filter or search.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}