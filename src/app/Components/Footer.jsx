"use client";

import Link from "next/link";
import {
  BookOpen,
  LogoFacebook,
  LogoGithub,
  LogoTwitter,
} from "@gravity-ui/icons";
import { BiLogoFacebook, BiLogoGithub, BiLogoTwitter } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold"
          >
            <BookOpen width={24} height={24} />
            BiblioDrop
          </Link>

          <p className="mt-3 text-sm text-base-content/70">
            Discover, borrow and buy your favorite books anytime,
            anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>

          <ul className="space-y-2">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Newsletter</h3>

          <div className="join w-full">
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered join-item w-full"
            />
            <button className="btn btn-primary join-item">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>

          <div className="flex gap-4">
            <a href="#" className="btn btn-circle btn-ghost">
              <BiLogoFacebook width={20} height={20} />
            </a>

            <a href="#" className="btn btn-circle btn-ghost">
              <BiLogoTwitter width={20} height={20} />
            </a>

            <a href="#" className="btn btn-circle btn-ghost">
              <BiLogoGithub width={20} height={20} />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t py-4 text-center text-sm text-base-content/70">
        © {new Date().getFullYear()} BiblioDrop. All Rights Reserved.
      </div>
    </footer>
  );
}