"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  House,
  BookOpen,
  LayoutList,
  ArrowRightToSquare,
} from "@gravity-ui/icons";
import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function Navbar() {

  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();


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
    }
  ];

  const handelsignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/login");
        }
      }
    });
  }

  if (isPending) {
    return (
      <div className="navbar bg-base-100">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

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


        {
          user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Image
                  width={40}
                  height={40}
                  src={user.image || "/default-avatar.png"}
                  alt={user.name}
                  className="rounded-full border-2 border-primary object-cover"
                />

                <div className="hidden md:block">
                  <p className="font-semibold leading-none">{user.name}</p>
                  <p className="text-xs text-base-content/60">{user.email}</p>
                </div>
              </div>

              <button
                onClick={handelsignOut}
                className="btn btn-error btn-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="btn btn-primary btn-sm"
            >
              Login
            </Link>
          )
        }


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