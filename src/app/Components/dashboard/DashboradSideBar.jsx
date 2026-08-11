import { getUserSession } from "@/lib/core/session";
import { Drawer } from "@heroui/react";
import Link from "next/link";

import { 
  House, 
  BookOpen, 
  Library, 
  ShoppingBag, 
  LayoutDashboard, 
  BookMarked, 
  PlusCircle, 
  ClipboardList, 
  ShieldCheck, 
  BookText, 
  Building2, 
  Users 
} from "lucide-react";

export async function DashBoardSidebar() {


    const user = await getUserSession();
    const userRole = user?.role || "user";



    const userNavLinks = [
        { icon: House, label: "Dashboard", href: "/dashboard/readers" },
        { icon: BookOpen, label: "Books", href: "/dashboard/readers/books" },
        { icon: Library, label: "Books Library", href: "/dashboard/readers/books/publisherbooks" },
        { icon: ShoppingBag, label: "Orders List", href: "/dashboard/readers/my-orders" },
    ]

    const librarianNavLinks = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/librarian" },
        { icon: BookMarked, label: "My Books", href: "/dashboard/librarian/books" },
        { icon: PlusCircle, label: "New Books Add", href: "/dashboard/librarian/books/add" },
        { icon: ClipboardList, label: "Orders Books", href: "/dashboard/librarian/booksOrder" },
    ]

    const adminNavLinks = [
        { icon: ShieldCheck, label: "Dashboard", href: "/dashboard/admin" },
        { icon: BookText, label: "Books List", href: "/dashboard/admin/books" },
        { icon: Building2, label: "Library List", href: "/dashboard/admin/books/publisherbooks" },
        { icon: Users, label: "All User List", href: "/dashboard/admin/userList" },
    ]


    //
    const navLinksMap = {
        user: userNavLinks,
        librarian: librarianNavLinks,
        admin: adminNavLinks,
    };


    const navItems = navLinksMap[userRole] || userNavLinks;

    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 text-white hover:text-black rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>

            <aside className="hidden w-64 srinks-0 border-r border-default border-defalt p-4 lg:block text-white">
                {navContent}
            </aside>

            <Drawer>

                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}