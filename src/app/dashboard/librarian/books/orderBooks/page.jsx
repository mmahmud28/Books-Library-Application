'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, BookOpen, Calendar, User, Mail, 
  Phone, MapPin, CheckCircle2, ShieldCheck, Info 
} from 'lucide-react';

const OrderBooks = ({ safeBook }) => {
  // ইউজার ইনপুট স্টেটসমূহ
  const [formData, setFormData] = useState({
    borrowerName: '',
    email: '',
    phone: '',
    address: '',
    borrowDays: '7',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Data:", { book: safeBook, user: formData });
    setIsSubmitted(true);
  };

  // ব্যাকে যাওয়ার ফাংশন
  const handleBackClick = () => {
    window.history.back();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-base-200/50 p-4 md:p-8 flex justify-center items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl bg-base-100/80 backdrop-blur-xl rounded-3xl border border-base-200/80 shadow-2xl overflow-hidden"
      >
        {/* Navigation Top Bar */}
        <motion.div variants={itemVariants} className="p-4 sm:p-6 border-b border-base-200/60 flex items-center justify-between">
          <button 
            onClick={handleBackClick}
            className="btn btn-ghost btn-sm rounded-xl gap-2 hover:bg-base-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Details
          </button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">Confirm Borrow Order</span>
          </div>
        </motion.div>

        {isSubmitted ? (
          /* Confirmation Success Message */
          <motion.div variants={itemVariants} className="p-10 text-center space-y-4">
            <CheckCircle2 className="w-20 h-20 text-success mx-auto animate-bounce" />
            <h2 className="text-3xl font-bold">Order Request Placed Successfully!</h2>
            <p className="text-base-content/70">
              We have received your request for <span className="font-bold text-primary">{safeBook?.title || 'the book'}</span>.
            </p>
            <button onClick={handleBackClick} className="btn btn-primary rounded-xl px-8 mt-4">
              Back to Catalog
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT SIDE: Book Summary (Auto Selected Data) */}
              <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
                <div className="bg-base-200/40 p-6 rounded-2xl border border-base-200/80">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" /> Selected Book Summary
                  </h3>
                  
                  <div className="flex gap-4 items-center">
                    <div className="relative w-24 h-36 rounded-xl overflow-hidden shadow-md border border-base-300 bg-base-200 flex-shrink-0">
                      <img
                        src={safeBook?.coverImage || "/placeholder.png"}
                        alt={safeBook?.title || "Book Cover"}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                      />
                    </div>
                    <div>
                      <span className="badge badge-primary badge-sm mb-1">{safeBook?.category || 'General'}</span>
                      <h4 className="font-bold text-base line-clamp-2">{safeBook?.title || 'Book Title'}</h4>
                      <p className="text-sm text-base-content/70 mt-1">
                        By: <span className="font-semibold text-base-content">{safeBook?.author || 'Unknown Author'}</span>
                      </p>
                      <p className="text-xs text-base-content/50 mt-2">
                        Publisher: {safeBook?.publisher || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="divider my-4"></div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-base-content/70">
                      <span>Condition:</span>
                      <span className="font-semibold text-base-content">{safeBook?.condition || 'Good'}</span>
                    </div>
                    <div className="flex justify-between text-base-content/70">
                      <span>Availability:</span>
                      <span className="font-semibold text-success">
                        {safeBook?.stockQuantity ? `${safeBook.stockQuantity} Copies Available` : 'In Stock'}
                      </span>
                    </div>
                    <div className="flex justify-between text-base-content/70">
                      <span>Managed By:</span>
                      <span className="font-semibold text-base-content">{safeBook?.addedBy || 'Librarian'}</span>
                    </div>
                  </div>
                </div>

                {/* Rules / Policy Info Box */}
                <div className="p-4 rounded-2xl bg-info/10 text-info border border-info/20 flex gap-3 items-start text-xs">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>
                    Please ensure to return the book on time. Overdue charges may apply according to library policy.
                  </p>
                </div>
              </motion.div>

              {/* RIGHT SIDE: User Input Form */}
              <motion.div variants={itemVariants} className="lg:col-span-7 space-y-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Borrower Information
                </h3>

                {/* Borrower Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" /> Full Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="borrowerName"
                    required
                    placeholder="Enter your full name"
                    value={formData.borrowerName}
                    onChange={handleChange}
                    className="input input-bordered rounded-xl w-full focus:outline-primary"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" /> Email Address *
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered rounded-xl w-full focus:outline-primary"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" /> Phone Number *
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+880 17XXXXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input input-bordered rounded-xl w-full focus:outline-primary"
                    />
                  </div>
                </div>

                {/* Duration / Return Date Selection */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> Borrow Duration *
                    </span>
                  </label>
                  <select
                    name="borrowDays"
                    value={formData.borrowDays}
                    onChange={handleChange}
                    className="select select-bordered rounded-xl w-full focus:outline-primary"
                  >
                    <option value="7">7 Days (1 Week)</option>
                    <option value="14">14 Days (2 Weeks)</option>
                    <option value="30">30 Days (1 Month)</option>
                  </select>
                </div>

                {/* Delivery Address / Department */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" /> Address / Department *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Enter delivery address or department info"
                    value={formData.address}
                    onChange={handleChange}
                    className="input input-bordered rounded-xl w-full focus:outline-primary"
                  />
                </div>

                {/* Additional Notes */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Additional Notes (Optional)</span>
                  </label>
                  <textarea
                    name="notes"
                    rows="2"
                    placeholder="Any special instructions for the librarian..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="textarea textarea-bordered rounded-xl w-full focus:outline-primary"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button type="submit" className="btn btn-primary w-full rounded-xl text-lg font-bold shadow-lg">
                    Confirm & Place Request
                  </button>
                </div>

              </motion.div>

            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default OrderBooks;