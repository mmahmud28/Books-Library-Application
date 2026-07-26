import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

import { NavLink } from "react-router";
import {
  BookOpen,
  LayoutDashboard,
  ChevronDown,
  LogIn,
  LogOut,
  Home,
  Menu,
} from "lucide-react";

const navigation = [
  {
    name: "Home",
    path: "/",
    icon: <Home size={18} />,
  },
  {
    name: "Browse Books",
    path: "/books",
    icon: <BookOpen size={18} />,
  },
];

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Demo Authentication
  const user = true;

  // Demo Role
  const role = "admin";
  // admin / user

  return (
    <Navbar
      isBordered
      maxWidth="2xl"
      onMenuOpenChange={setIsMenuOpen}
      className="sticky top-0 z-50 backdrop-blur-3xl bg-black/50 border-b border-white/10"
    >
      {/* Mobile */}

      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          icon={<Menu />}
          aria-label="Menu"
        />
      </NavbarContent>

      {/* Logo */}

      <NavbarBrand>
        <NavLink
          to="/"
          className="flex items-center gap-3"
        >
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-violet-600 flex items-center justify-center text-white font-black text-xl shadow-[0_0_25px_rgba(59,130,246,.5)]">
            B
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-wide bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              BookVerse
            </h1>

            <p className="text-[11px] text-default-500 uppercase tracking-[4px]">
              Digital Library
            </p>
          </div>
        </NavLink>
      </NavbarBrand>

      {/* Desktop */}

      <NavbarContent
        className="hidden lg:flex gap-3"
        justify="center"
      >
        {navigation.map((item) => (
          <NavbarItem key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-2 rounded-full px-5 py-3 transition-all duration-300

                ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl"
                    : "text-default-600 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          </NavbarItem>
        ))}

        {/* Dashboard */}

        {user && (
          <Dropdown backdrop="blur">
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  variant="light"
                  endContent={<ChevronDown size={18} />}
                  startContent={<LayoutDashboard size={18} />}
                  className="font-semibold text-default-700 hover:text-white"
                >
                  Dashboard
                </Button>
              </DropdownTrigger>
            </NavbarItem>

            <DropdownMenu aria-label="Dashboard">
              {role === "admin" ? (
                <>
                  <DropdownItem key="dashboard">
                    Admin Dashboard
                  </DropdownItem>

                  <DropdownItem key="users">
                    Manage Users
                  </DropdownItem>

                  <DropdownItem key="books">
                    Manage Books
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem key="dashboard">
                    My Dashboard
                  </DropdownItem>

                  <DropdownItem key="borrow">
                    Borrowed Books
                  </DropdownItem>

                  <DropdownItem key="profile">
                    Profile
                  </DropdownItem>
                </>
              )}
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      {/* Right */}

      <NavbarContent justify="end">
        {!user ? (
          <Button
            as={NavLink}
            to="/login"
            color="primary"
            radius="full"
            startContent={<LogIn size={18} />}
            className="font-bold px-6"
          >
            Login
          </Button>
        ) : (
          <Button
            color="danger"
            variant="flat"
            radius="full"
            startContent={<LogOut size={18} />}
            className="font-bold"
          >
            Logout
          </Button>
        )}
      </NavbarContent>

      {/* Mobile Menu */}

      <NavbarMenu className="pt-10 bg-black/90 backdrop-blur-3xl">

        {navigation.map((item) => (
          <NavbarMenuItem key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-4 transition

                ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "text-default-300 hover:bg-white/10"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          </NavbarMenuItem>
        ))}

        {user && (
          <>
            <NavbarMenuItem>
              <NavLink
                to="/dashboard"
                className="flex items-center gap-3 rounded-xl px-4 py-4 hover:bg-white/10"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </NavLink>
            </NavbarMenuItem>
          </>
        )}

        {!user ? (
          <NavbarMenuItem>
            <NavLink
              to="/login"
              className="flex items-center gap-3 rounded-xl px-4 py-4 hover:bg-white/10"
            >
              <LogIn size={20} />
              Login
            </NavLink>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left hover:bg-red-500/20">
              <LogOut size={20} />
              Logout
            </button>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;