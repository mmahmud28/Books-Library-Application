import BookManagementView from "@/app/Components/BookManagementView";
import { allBooksList } from "@/lib/api/userList";

const AllBookList = async () => {
  const books = await allBooksList();

  return <BookManagementView initialBooks={books} />;
};

export default AllBookList;