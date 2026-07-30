import { LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashBoardSidebar() {
    const navItems = [
        { icon: House, label: "Dashboard", href: "/dashboard/readers" },
        { icon: Magnifier, label: "Books", href: "/dashboard/readers/books" },
        { icon: Bell, label: "My Reading List", href: "/dashboard/reading-list" },
        { icon: Envelope, label: "My Reviews", href: "/dashboard/reviews" },
        { icon: Person, label: "Profile", href: "/dashboard/profile" },
        { icon: Gear, label: "Settings", href: "/dashboard/settings" },
    ];

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