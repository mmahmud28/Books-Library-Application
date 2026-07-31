"use client";

import { useEffect, useMemo, useState } from "react";
import { getlibraribooks } from "@/lib/api/librainBooksLoad";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { bookDelete } from "@/lib/action/librarians";
import toast from "react-hot-toast";

const LibrarianAllBooksPage = () => {
    const { data: session } = useSession();
    const [selectedBook, setSelectedBook] = useState(null);

    const user = session?.user;

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const loadBooks = async () => {
            if (!user?.id) return;

            const data = await getlibraribooks(user.id);

            setBooks(data || []);
        };

        loadBooks();
    }, [user?.id]);

    const summary = useMemo(() => {
        return {
            total: books.length,
            active: books.filter((b) => b.status === "active").length,
            pending: books.filter((b) => b.status === "pending").length,
            canceled: books.filter((b) => b.status === "canceled").length,
        };
    }, [books]);

    const handleDelete = async (bookId) => {
        const result = await bookDelete(bookId);

        if (result.deletedCount > 0) {
            setBooks((prev) => prev.filter((book) => book._id !== bookId));
            toast.success("Book deleted successfully");
        } else {
            toast.error("Failed to delete book");
        }
    };

    const handleStatus = (bookId, newStatus) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) =>
                book._id === bookId ? { ...book, status: newStatus } : book
            )
        );
    }

    return (
        <div className="min-h-screen bg-base-100 p-6 lg:p-10">
            <div className="mb-10">

                <h1 className="text-5xl font-black">
                    My Library
                </h1>

                <p className="text-base-content/60 mt-2">
                    Manage all your books from one place.
                </p>

            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-10">

                <div className="card bg-gradient-to-br from-cyan-500/20 to-cyan-900 border border-cyan-500/20 backdrop-blur-xl shadow-xl">
                    <div className="card-body">
                        <div className="text-5xl">📚</div>

                        <p className="text-base-content/60">
                            Total Books
                        </p>

                        <h2 className="text-4xl font-black">
                            {summary.total}
                        </h2>
                    </div>
                </div>

                <div className="card bg-gradient-to-br from-green-500/20 to-green-900 border border-green-500/20 backdrop-blur-xl shadow-xl">
                    <div className="card-body">
                        <div className="text-5xl">✅</div>

                        <p className="text-base-content/60">
                            Approved
                        </p>

                        <h2 className="text-4xl font-black text-green-400">
                            {summary.active}
                        </h2>
                    </div>
                </div>

                <div className="card bg-gradient-to-br from-yellow-500/20 to-yellow-900 border border-yellow-500/20 backdrop-blur-xl shadow-xl">
                    <div className="card-body">
                        <div className="text-5xl">⏳</div>

                        <p className="text-base-content/60">
                            Pending
                        </p>

                        <h2 className="text-4xl font-black text-yellow-400">
                            {summary.pending}
                        </h2>
                    </div>
                </div>

                <div className="card bg-gradient-to-br from-red-500/20 to-red-900 border border-red-500/20 backdrop-blur-xl shadow-xl">
                    <div className="card-body">
                        <div className="text-5xl">❌</div>

                        <p className="text-base-content/60">
                            Canceled
                        </p>

                        <h2 className="text-4xl font-black text-red-400">
                            {summary.canceled}
                        </h2>
                    </div>
                </div>

            </div>


            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

                {
                    books.map(book => (
                        <div
                            key={book._id}
                            className="card bg-base-200 border border-base-300 hover:border-primary duration-300 shadow-xl hover:shadow-cyan-500/20 overflow-hidden group"
                        >

                            <figure className="h-72 overflow-hidden">

                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                                />

                            </figure>

                            <div className="card-body">

                                <div className="flex justify-between">

                                    <h2 className="card-title">
                                        {book.title}
                                    </h2>

                                    <div
                                        className={`badge
${book.status === "active"
                                                ? "badge-success" :
                                                book.status === "pending"
                                                    ? "badge-warning" :
                                                    "badge-error"
                                            }`}
                                    >

                                        {book.status}

                                    </div>

                                </div>

                                <p className="text-base-content/70">
                                    ✍ {book.author}
                                </p>

                                <div className="divider my-1"></div>

                                <div className="space-y-2 text-sm">

                                    <div className="flex justify-between">

                                        <span>Publisher</span>

                                        <span>{book.publisher}</span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Category</span>

                                        <span>{book.category}</span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Language</span>

                                        <span>{book.languages}</span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Year</span>

                                        <span>{book.publishedYear}</span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Condition</span>

                                        <span>{book.condition}</span>

                                    </div>

                                    <div className="flex justify-between">

                                        <span>Stock</span>

                                        <span className="badge badge-info">
                                            {book.stockQuantity}
                                        </span>

                                    </div>

                                </div>



                                <div className="card-actions mt-6 flex-col gap-3">

                                    <Link
                                        href={`/dashboard/librarian/books/${book._id}`}
                                        className="btn btn-primary w-full"
                                    >
                                        View Details
                                    </Link>

                                    <div className="grid grid-cols-2 gap-3 w-full">

                                        <Link
                                            href={`/dashboard/librarian/books/edit/${book._id}`}
                                            className="btn btn-outline btn-info"
                                        >
                                            ✏️ Edit
                                        </Link>

                                        <button
                                            onClick={() => {
                                                setSelectedBook(book);
                                                document.getElementById("delete_book_modal").showModal();
                                            }}
                                            className="btn btn-outline btn-error"
                                        >
                                            🗑 Delete
                                        </button>

                                    </div>

                                    <button
                                        onClick={() =>
                                            handleStatus(
                                                book._id,
                                                book.status === "active" ? "inactive" : "active"
                                            )
                                        }
                                        className={`btn w-full ${book.status === "active"
                                            ? "btn-warning"
                                            : "btn-success"
                                            }`}
                                    >
                                        {book.status === "active"
                                            ? "🚫 Unpublish"
                                            : "👁 Publish"}
                                    </button>

                                </div>


                            </div>

                        </div>
                    ))
                }

            </div>

            {
                books.length === 0 && (

                    <div className="hero rounded-3xl bg-base-200 py-24">

                        <div className="hero-content text-center">

                            <div>

                                <div className="text-8xl">
                                    📚
                                </div>

                                <h2 className="text-4xl font-black mt-6">
                                    No Books Found
                                </h2>

                                <p className="mt-3 text-base-content/60">
                                    You haven not added any books yet.
                                </p>

                                <button className="btn btn-primary mt-6">
                                    Add New Book
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }
            <dialog id="delete_book_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-error">
                        Delete Book?
                    </h3>

                    <p className="py-4">
                        Are you sure you want to delete
                        <span className="font-bold text-primary">
                            {" "}
                            {selectedBook?.title}
                        </span>
                        ?
                    </p>

                    <p className="text-sm text-base-content/60">
                        This action cannot be undone.
                    </p>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">
                                Cancel
                            </button>
                        </form>

                        <button
                            onClick={async () => {
                                await handleDelete(selectedBook._id);
                                document.getElementById("delete_book_modal").close();
                            }}
                            className="btn btn-error"
                        >
                            🗑 Yes, Delete
                        </button>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>

    );
};

export default LibrarianAllBooksPage;