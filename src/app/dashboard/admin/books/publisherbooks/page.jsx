import Image from "next/image";
import Link from "next/link";
import { allLibrarianList } from "@/lib/api/librainBooksLoad";

const AllLibrarianList = async () => {
  const librarianList = await allLibrarianList();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">📚 All Librarians</h1>
        <p className="text-base-content/60 mt-2">
          Manage all librarians and view their uploaded books.
        </p>
      </div>

      {/* Stats */}
      <div className="stats shadow w-full mb-8">
        <div className="stat">
          <div className="stat-title">Total Librarians</div>
          <div className="stat-value text-primary">
            {librarianList.length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-xl border border-base-300">
        <table className="table table-zebra">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>#</th>
              <th>Librarian</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th className="text-center">Books</th>
            </tr>
          </thead>

          <tbody>
            {librarianList.map((librarian, index) => (
              <tr key={librarian._id} className="hover">
                {/* Serial */}
                <td className="font-bold">{index + 1}</td>

                {/* Profile */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        
                        <img
                          src={librarian?.image || "/default-avatar.png"}
                          alt={librarian?.name || "Librarian Avatar"}
                          className="w-[56px] h-[56px] rounded-full object-cover"                                                    
                        />

                      </div>
                    </div>

                    <div>
                      <div className="font-bold">
                        {librarian.name}
                      </div>

                      <div className="text-xs opacity-60">
                        ID: {librarian._id.slice(-6)}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Phone */}
                <td>{librarian.phone}</td>

                {/* Email */}
                <td>{librarian.email}</td>

                {/* Role */}
                <td>
                  <span className="badge badge-success badge-outline capitalize">
                    {librarian.role}
                  </span>
                </td>

                {/* Joined */}
                <td>
                  {new Date(librarian.createdAt).toLocaleDateString()}
                </td>

                {/* Action */}
                <td className="text-center">
                  <Link
                    href={`/dashboard/admin/books/publisherbooks/${encodeURIComponent(librarian.name)}`}
                    className="btn btn-primary btn-sm"
                  >
                    📚 View Books
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {librarianList.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold">
              No Librarian Found
            </h2>
            <p className="text-base-content/60 mt-2">
              There are currently no librarians available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLibrarianList;