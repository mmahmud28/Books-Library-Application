"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  BookOpen,
  LayoutList,
  ArrowRightToSquare,
} from "@gravity-ui/icons";

export default function Navbar() {
  const pathname = usePathname();

  const menus = [
    {
      name: "Home",
      href: "/",
      icon: <House width={18} height={18} />,
    },
    {
      name: "Browse Books",
      href: "/books",
      icon: <BookOpen width={18} height={18} />,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutList width={18} height={18} />,
    },
    {
      name: "Login",
      href: "/login",
      icon: <ArrowRightToSquare width={18} height={18} />,
    },
  ];

  return (
    <div className="navbar bg-base-100 border-b px-4">

  {/* Left */}
  <div className="navbar-start">
    <Link href="/" className="flex items-center gap-2 text-xl font-bold">
      <BookOpen width={24} height={24} />
      <span>BiblioDrop</span>
    </Link>
  </div>

  {/* Center */}
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal gap-2">
      {menus.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={pathname === item.href ? "active" : ""}
          >
            {item.icon}
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>

  {/* Right */}
  <div className="navbar-end">
    <Link href="/logout" className="btn btn-primary btn-sm">
      Logout
    </Link>

    {/* Mobile Menu */}
    <div className="dropdown dropdown-end lg:hidden ml-2">
      <label tabIndex={0} className="btn btn-ghost">
        ☰
      </label>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] w-56 rounded-box bg-base-100 p-2 shadow"
      >
        {menus.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>

</div>
  );
}