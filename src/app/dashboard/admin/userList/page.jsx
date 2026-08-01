import UserManagementView from "@/app/Components/UserManagementView";
import { allUserList } from "@/lib/api/userList";

const UserList = async () => {
  const users = await allUserList();

  const admins = users.filter((user) => user.role === "admin");
  const librarians = users.filter((user) => user.role === "librarian");
  const readers = users.filter((user) => user.role === "user");

  const sections = [
    {
      id: "admin",
      title: "Administrators",
      badge: "badge-error",
      users: admins,
    },
    {
      id: "librarian",
      title: "Librarians",
      badge: "badge-warning",
      users: librarians,
    },
    {
      id: "user",
      title: "Readers",
      badge: "badge-success",
      users: readers,
    },
  ];

  return <UserManagementView sections={sections} />;
};

export default UserList;