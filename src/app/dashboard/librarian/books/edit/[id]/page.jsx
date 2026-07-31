"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

const BooksEditPage = () => {
    const params = useParams();
    const router = useRouter();

    const id = params?.id;

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // =========================
    // Get Single Book
    // =========================
    useEffect(() => {
        if (!id) return;

        const fetchBook = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `http://localhost:5000/api/books/${id}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch book");
                }

                const data = await res.json();

                setBook(data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load book");
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    // =========================
    // Update Book
    // =========================
    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;

        const updatedBook = {
            title: form.title.value,
            author: form.author.value,
            publisher: form.publisher.value,
            category: form.category.value,
            languages: form.languages.value,
            publishedYear: form.publishedYear.value,
            stockQuantity: form.stockQuantity.value,
            condition: form.condition.value,
            coverImage: form.coverImage.value,
        };

        try {
            setUpdating(true);

            const res = await fetch(
                `http://localhost:5000/api/editBooks/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedBook),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update book");
            }

            toast.success("Book updated successfully!");

            // কিছুক্ষণ পরে books page-এ নিয়ে যাবে
            setTimeout(() => {
                router.push("/dashboard/librarian/books");
            }, 1000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setUpdating(false);
        }
    };

    // =========================
    // Loading
    // =========================
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-info"></span>
            </div>
        );
    }

    // =========================
    // Book Not Found
    // =========================
    if (!book) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold text-red-500">
                    Book not found
                </h2>

                <Link
                    href="/dashboard/librarian/books"
                    className="btn btn-info"
                >
                    ← Back to Books
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>
                            <h1 className="text-3xl font-bold">
                                ✏️ Edit Book
                            </h1>

                            <p className="text-base-content/60 mt-1">
                                Update your book information
                            </p>
                        </div>

                        <Link
                            href="/dashboard/librarian/books"
                            className="btn btn-outline"
                        >
                            ← Back to Books
                        </Link>

                    </div>
                </div>

                {/* Form Card */}
                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body ">

                        <form onSubmit={handleUpdate}>

                            <div className="grid  grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Title */}
                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Book Title
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        defaultValue={book.title || ""}
                                        placeholder="Enter book title"
                                        className="input input-bordered text-white w-full"
                                        required
                                    />
                                </div>

                                {/* Author */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Author
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="author"
                                        defaultValue={book.author || ""}
                                        placeholder="Enter author name"
                                        className="input text-white input-bordered w-full"
                                        required
                                    />
                                </div>

                                {/* Publisher */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Publisher
                                        </span>
                                    </label>

                                    <input
                                        type="text"
                                        name="publisher"
                                        defaultValue={book.publisher || ""}
                                        placeholder="Enter publisher"
                                        className="input    text-white input-bordered w-full"
                                    />
                                </div>

                                {/* Category */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Category
                                        </span>
                                    </label>

                                    <select
                                        name="category"
                                        defaultValue={book.category || ""}
                                        className="select text-white select-bordered w-full"
                                        required
                                    >
                                        <option value="" disabled>
                                            Select category
                                        </option>

                                        <option value="Fiction">
                                            Fiction
                                        </option>

                                        <option value="Non-Fiction">
                                            Non-Fiction
                                        </option>

                                        <option value="Science">
                                            Science
                                        </option>

                                        <option value="Technology">
                                            Technology
                                        </option>

                                        <option value="Programming">
                                            Programming
                                        </option>

                                        <option value="History">
                                            History
                                        </option>

                                        <option value="Education">
                                            Education
                                        </option>

                                        <option value="Biography">
                                            Biography
                                        </option>
                                    </select>
                                </div>

                                {/* Language */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Language
                                        </span>
                                    </label>

                                    <select
                                        name="languages"
                                        defaultValue={book.languages || ""}
                                        className="select text-white text-white select-bordered w-full"
                                        required
                                    >
                                        <option value="" disabled>
                                            Select language
                                        </option>

                                        <option value="English">
                                            English
                                        </option>

                                        <option value="Bangla">
                                            Bangla
                                        </option>

                                        <option value="Arabic">
                                            Arabic
                                        </option>

                                        <option value="Hindi">
                                            Hindi
                                        </option>
                                    </select>
                                </div>

                                {/* Published Year */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Published Year
                                        </span>
                                    </label>

                                    <input
                                        type="number"
                                        name="publishedYear"
                                        defaultValue={
                                            book.publishedYear || ""
                                        }
                                        placeholder="2026"
                                        className="input text-white input-bordered w-full"
                                    />
                                </div>

                                {/* Stock Quantity */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Stock Quantity
                                        </span>
                                    </label>

                                    <input
                                        type="number"
                                        name="stockQuantity"
                                        defaultValue={
                                            book.stockQuantity || ""
                                        }
                                        placeholder="Enter stock quantity"
                                        min="0"
                                        className="input text-white  input-bordered w-full"
                                        required
                                    />
                                </div>

                                {/* Condition */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Book Condition
                                        </span>
                                    </label>

                                    <select
                                        name="condition"
                                        defaultValue={book.condition || ""}
                                        className="select text-white select-bordered w-full"
                                    >
                                        <option value="" disabled>
                                            Select condition
                                        </option>

                                        <option value="New">
                                            New
                                        </option>

                                        <option value="Good">
                                            Good
                                        </option>

                                        <option value="Used">
                                            Used
                                        </option>

                                        <option value="Damaged">
                                            Damaged
                                        </option>
                                    </select>
                                </div>

                                {/* Cover Image */}
                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text font-semibold">
                                            Cover Image URL
                                        </span>
                                    </label>

                                    <input
                                        type="url"
                                        name="coverImage"
                                        defaultValue={
                                            book.coverImage || ""
                                        }
                                        placeholder="https://example.com/book-cover.jpg"
                                        className="input input-bordered w-full"
                                    />

                                    {/* Image Preview */}
                                    {book.coverImage && (
                                        <div className="mt-4">
                                            <p className="text-sm text-base-content/60 mb-2">
                                                Current Cover
                                            </p>

                                            <img
                                                src={book.coverImage}
                                                alt={book.title}
                                                className="w-32 h-44 object-cover rounded-lg border shadow"
                                            />
                                        </div>
                                    )}
                                </div>                                
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">

                                <Link
                                    href="/dashboard/librarian/books"
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    className="btn btn-info text-white"
                                    disabled={updating}
                                >
                                    {updating ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            💾 Update Book
                                        </>
                                    )}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksEditPage;