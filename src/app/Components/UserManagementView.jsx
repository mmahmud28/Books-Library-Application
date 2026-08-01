"use client";

import { useState } from "react";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiRepeat, FiUsers, FiShield, FiBookOpen } from "react-icons/fi";

export default function UserManagementView({ sections }) {
    const [activeTab, setActiveTab] = useState("all");

    // সকল ইউজারদের একটি এরেতে নিয়ে আসা
    const allUsers = sections.flatMap((sec) => sec.users);

    // ফিল্টার অনুযায়ী ইউজারের তালিকা বের করা
    const currentUsers =
        activeTab === "all"
            ? allUsers
            : sections.find((sec) => sec.id === activeTab)?.users || [];

    const tabIcons = {
        all: <FiUsers className="w-4 h-4" />,
        admin: <FiShield className="w-4 h-4" />,
        librarian: <FiBookOpen className="w-4 h-4" />,
        user: <FiUsers className="w-4 h-4" />,
    };

    return (
        <div className="space-y-8 p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-base-200 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
                        User Management
                    </h1>
                    <p className="text-sm text-base-content/60 mt-1">
                        Manage permissions, roles, and user accounts efficiently.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-base-200/60 p-1.5 rounded-xl border border-base-300 backdrop-blur">
                    <div className="stat-title text-xs font-semibold px-3">Total Users</div>
                    <div className="badge badge-primary font-bold badge-lg">{allUsers.length}</div>
                </div>
            </div>

            {/* Premium Tabs Navigation */}
            <div className="flex border-b border-base-300 space-x-2 overflow-x-auto">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`flex items-center gap-2 px-5 py-3 font-medium text-sm transition-all duration-200 border-b-2 whitespace-nowrap ${activeTab === "all"
                        ? "border-primary text-primary bg-primary/5 font-semibold rounded-t-lg"
                        : "border-transparent text-base-content/60 hover:text-base-content hover:border-base-300"
                        }`}
                >
                    {tabIcons.all}
                    All Users
                    <span className="badge badge-sm badge-neutral">{allUsers.length}</span>
                </button>

                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => setActiveTab(section.id)}
                        className={`flex items-center gap-2 px-5 py-3 font-medium text-sm transition-all duration-200 border-b-2 whitespace-nowrap ${activeTab === section.id
                            ? "border-primary text-primary bg-primary/5 font-semibold rounded-t-lg"
                            : "border-transparent text-base-content/60 hover:text-base-content hover:border-base-300"
                            }`}
                    >
                        {tabIcons[section.id]}
                        {section.title}
                        <span className={`badge badge-sm ${section.badge}`}>
                            {section.users.length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Main Table Card */}
            <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200/80 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-base-200/50 text-base-content/70 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="py-4 px-6">#</th>
                                <th>User Details</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-base-200 text-sm">
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user, index) => (
                                    <tr key={user._id} className="hover:bg-base-200/30 transition-colors">
                                        <td className="py-4 px-6 font-medium text-base-content/50">
                                            {index + 1}
                                        </td>

                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-14 h-14 overflow-hidden rounded-full">
                                                    <Image
                                                        src={user.image || "/placeholder.png"}
                                                        alt={user.name || "User"}
                                                        fill
                                                        sizes="56px"
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-base-content">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-xs text-base-content/40 font-mono">
                                                        ID: #{user._id.slice(-6)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="text-base-content/80 font-medium">
                                            {user.phone || "N/A"}
                                        </td>

                                        <td className="text-base-content/80">{user.email}</td>

                                        <td>
                                            <span
                                                className={`badge badge-sm font-semibold capitalize py-2 px-3 gap-1 ${user.role === "admin"
                                                    ? "badge-error text-error-content"
                                                    : user.role === "librarian"
                                                        ? "badge-warning text-warning-content"
                                                        : "badge-success text-success-content"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="text-base-content/70">
                                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>

                                        <td>
                                            <div className="flex justify-center items-center gap-1.5">
                                                <button
                                                    className="btn btn-ghost btn-xs text-info hover:bg-info/10 tooltip"
                                                    data-tip="Edit Profile"
                                                >
                                                    <FiEdit2 className="w-4 h-4" />
                                                </button>

                                                <button
                                                    className="btn btn-ghost btn-xs text-warning hover:bg-warning/10 tooltip"
                                                    data-tip="Change Role"
                                                >
                                                    <FiRepeat className="w-4 h-4" />
                                                </button>

                                                <button
                                                    className="btn btn-ghost btn-xs text-error hover:bg-error/10 tooltip"
                                                    data-tip="Delete User"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-12 text-base-content/50">
                                        No users found in this category.
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