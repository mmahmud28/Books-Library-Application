"use client";

import { createBooks } from "@/lib/action/books";
import { useSession } from "@/lib/auth-client";
import { getSession } from "better-auth/api";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const categories = [
  "Programming",
  "Novel",
  "Science",
  "History",
  "Biography",
  "Islamic",
  "Business",
  "Children",
  "Others",
];

const languages = ["Bangla", "English", "Arabic", "Hindi", "Urdu"];
const conditions = ["New", "Like New", "Good", "Fair"];

export default function AddBooks() {

  const [coverImage, setCoverImage] = useState("");
  const [imageError, setImageError] = useState(false);
  const [isUploading, setUploading] = useState(false);

  const { data: session, isPending } = useSession();


  const user = session?.user || null;

  const id = user?.id || null;
  



  // Handle URL change & reset image load error state
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImageError(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setCoverImage(data.data.display_url);
        setImageError(false);
        toast.success("Image Uploaded Successfully");
      } else {
        toast.error("Upload Failed");
      }
    } catch (error) {

      toast.error("Upload Failed");
    } finally {
      setUploading(false);
    }
  };


  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage) {
      toast.error("Please Upload Book Cover");
      return;
    }

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    const bookData = {
      title: data.title,
      author: data.author,
      publisher: data.publisher,
      publishedYear: data.publishedYear,
      languages: data.languages,
      category: data.category,
      stockQuantity: data.stockQuantity,
      condition: data.condition,
      addedBy: data.addedBy,
      status: data.status,
      coverImage,
      addById: id,
      price: parseFloat(data.price) || 0,
    };

    const res = await createBooks(bookData);

    if (res.insertedId) {
      toast.success("Book Added Successfully");

      e.target.reset();

      setCoverImage("");

      setImageError(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-300 text-base-content py-10 px-4 sm:px-6 lg:px-8 relative font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header / Banner */}
        <div className="card bg-base-100 border border-base-200 shadow-xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-primary font-bold text-xs uppercase tracking-wider">
                  Library Management
                </span>
                <span className="badge badge-ghost text-xs font-mono">v3.0</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
                <span>📚</span> Add New Book
              </h1>
              <p className="text-base-content/70 text-sm sm:text-base mt-2 max-w-xl">
                Expand your digital catalog with metadata, cover artwork, and stock records.
              </p>
            </div>

            <div className="badge badge-warning p-4 font-bold text-xs self-start md:self-auto uppercase tracking-wide">
              Status: Pending Approval
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="card bg-base-100 border border-base-200 shadow-2xl p-6 sm:p-10">
          <form onSubmit={handelSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-12 gap-10">

              {/* Left Column: Cover Artwork */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span>🖼️</span> Cover Artwork
                  </h2>
                  <p className="text-xs text-base-content/60 mt-1">
                    Provide an image link or upload a file directly.
                  </p>
                </div>

                {/* Dynamic Preview Box */}
                {/* Dynamic Preview Box */}
                <div className="border-2 border-dashed border-base-300 bg-base-200/50 rounded-2xl flex flex-col items-center justify-center min-h-[280px] p-4 overflow-hidden">

                  {coverImage && !imageError ? (
                    <div className="relative w-full h-[260px]">
                      <Image
                        src={coverImage}
                        alt="Book Cover"
                        fill
                        className="object-contain rounded-xl"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl">📚</div>
                      <h2 className="font-bold mt-3">
                        {isUploading ? "Uploading..." : "No Image Selected"}
                      </h2>
                      <p className="text-sm opacity-60 mt-1">
                        Upload Book Cover
                      </p>
                    </div>
                  )}

                </div>


                {/* File Upload */}
                <fieldset className="fieldset">

                  <legend className="fieldset-legend">
                    Upload Book Cover
                  </legend>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input file-input-bordered file-input-primary w-full"
                  />

                </fieldset>
              </div>

              {/* Right Column: Book Specifications */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span>📝</span> Book Specification
                  </h2>
                  <p className="text-xs text-base-content/60 mt-1">
                    Fill in mandatory metadata and catalog entries.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Title */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs font-bold">
                      Book Title <span className="text-error">*</span>
                    </legend>
                    <input
                      name="title"
                      type="text"
                      placeholder="e.g. Clean Code"
                      className="input text-white input-bordered w-full"
                      required
                    />
                  </fieldset>

                  {/* Author */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs font-bold">
                      Author Name <span className="text-error">*</span>
                    </legend>
                    <input
                      name="author"
                      type="text"
                      placeholder="e.g. Robert C. Martin"
                      className="input text-white input-bordered w-full"
                      required
                    />
                  </fieldset>

                  {/* Publisher */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs font-bold">
                      Publisher
                    </legend>
                    <input
                      name="publisher"
                      type="text"
                      placeholder="e.g. Prentice Hall"
                      className="input text-white input-bordered w-full"
                    />
                  </fieldset>

                  {/* Published Year */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs font-bold">
                      Published Year
                    </legend>
                    <input
                      name="publishedYear"
                      type="number"
                      placeholder="2026"
                      className="input text-white input-bordered w-full"
                    />
                  </fieldset>

                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs font-bold">
                      Price
                    </legend>
                    <input
                      name="price"
                      type="number"
                      placeholder="0.00"
                      className="input text-white input-bordered w-full"
                    />
                  </fieldset>

                  {/* Language */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs font-bold">
                      Language <span className="text-error">*</span>
                    </legend>
                    <select
                      name="languages"
                      className="select select-bordered w-full"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select Language
                      </option>
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  {/* Category */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs font-bold">
                      Category <span className="text-error">*</span>
                    </legend>
                    <select
                      name="category"
                      className="select select-bordered w-full"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  {/* Stock Quantity */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs font-bold">
                      Stock Quantity
                    </legend>
                    <input
                      name="stockQuantity"
                      type="number"
                      placeholder="0"
                      min="0"
                      className="input text-white input-bordered w-full"
                    />
                  </fieldset>

                  {/* Condition */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs font-bold">
                      Book Condition <span className="text-error">*</span>
                    </legend>
                    <select
                      name="condition"
                      className="select select-bordered w-full"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select Condition
                      </option>
                      {conditions.map((cond) => (
                        <option key={cond} value={cond}>
                          {cond}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  {/* Readonly: Added By */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs font-bold">
                      Added By
                    </legend>
                    <input
                      name="addedBy"
                      type="text"
                      value={user?.name || "N/A"}
                      readOnly
                      className="input text-white input-bordered w-full bg-base-200 text-base-content/70 cursor-not-allowed"
                    />
                  </fieldset>                  



                  {/* Readonly: Status */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-xs font-bold">
                      Status
                    </legend>
                    <input
                      name="status"
                      type="text"
                      value="Pending Approval"
                      readOnly
                      className="input text-white input-bordered input-warning w-full font-bold cursor-not-allowed"
                    />
                  </fieldset>
                </div>

                {/* Buttons */}
                <div className="pt-6 flex items-center justify-end gap-3 border-t border-base-200 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImage("");
                      setImageError(false);
                    }}
                    className="btn btn-ghost text-error"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="btn btn-primary px-8"
                  >
                    {isUploading ? "Uploading..." : "Add Book"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}