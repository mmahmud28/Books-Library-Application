import { LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

export function DashBoardSidebar() {
    const navItems = [
        { icon: House, label: "Dashboard" },
        { icon: Magnifier, label: "Delivery History" },
        { icon: Bell, label: "My Reading List" },
        { icon: Envelope, label: "My Reviews" },
        { icon: Person, label: "Profile" },
        { icon: Gear, label: "Settings" },
    ];

    const navContent = <nav className="flex flex-col gap-1">
                                    {navItems.map((item) => (
                                        <button
                                            key={item.label}
                                            className="flex items-center gap-3 text-white hover:text-black rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                                            type="button"
                                        >
                                            <item.icon className="size-5 text-muted" />
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>

    return (
        <>

        <aside className="hidden w-64 srinks-0 border-r border-default border-defalt p-4 lg:block text-white">
            {navContent}
        </aside>

            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
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