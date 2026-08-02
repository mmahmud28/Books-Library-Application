import BookManagementView from "@/app/Components/BookManagementView";
import { allBooksList } from "@/lib/api/userList";
import { getUserSession } from "@/lib/core/session";

const AllBookList = async () => {
  const books = await allBooksList();

  const user = await getUserSession();
  if (!user) {
    return <div>You do not have permission to view this page.</div>;
  }

  return <BookManagementView initialBooks={books} />;
};

export default AllBookList;