'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <nav className="w-full relative bg-gray-800 rounded-lg mb-6">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  Home
                </Link>
                {isLoggedIn && (
                  <>
                    <Link
                      href="/product-category"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                    >
                      Product Category
                    </Link>
                    <Link
                      href="/product"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                    >
                      Product
                    </Link>
                    <Link
                      href="/product-variant"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                    >
                      Product Variant
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

