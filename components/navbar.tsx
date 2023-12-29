"use client";

import React, { useEffect, useState } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Image } from "@nextui-org/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { MentoreeIcon } from "./icons";
import { Link } from "@nextui-org/link";

export const NavbarGlobal = () => {
  const [navigation, setNavigation] = useState([
    {
      name: "",
      href: "",
    },
  ]);
  const { data: session } = useSession();

  useEffect(() => {
    switch (session?.user?.role) {
      case "user":
        setNavigation(navigationUser);
        break;
      case "admin":
        setNavigation(navigationAdmin);
        break;
      case "mentor":
        setNavigation(navigationMentor);
        break;
      default:
        break;
    }
  }, [session?.user?.role]);

  const navigationUser = [
    { name: "Explore", href: "/explore" },
    { name: "Mentoringku", href: "/mentoringku" },
  ];

  const navigationAdmin = [
    { name: "Explore", href: "/explore" },
    { name: "Mentoringku", href: "/mentoringku" },
    { name: "Pendaftaran Mentor", href: "/admin/mentor-registration" },
    { name: "Daftar Transaksi User", href: "/admin/transaction" },
  ];

  const navigationMentor = [
    { name: "Mentoring Aktif", href: "/mentor/mentoringku" },
    { name: "Histori Transaksi", href: "/mentor/transaction" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 bg-white lg:gap-x-12 lg:px-8 dark:bg-mentoree dark:text-white"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Mentoree</span>
            <MentoreeIcon />
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {session?.user?.role === "" && ""}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-12">
          {session ? (
            <div className="flex gap-x-12">
              <Link
                href="/profile"
                className="flex flex-row items-center gap-x-6"
              >
                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {session?.user?.name}
                </p>
                <Image
                  alt="user-image"
                  className="w-8 rounded-full"
                  src={session?.user?.image ?? ""}
                />
              </Link>
              <ThemeSwitch />
              <button
                onClick={() => signOut()}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Log Out <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
        <div className="flex lg:hidden gap-x-8">
          <ThemeSwitch className="-m-2.5" />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white dark:bg-mentoree sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <MentoreeIcon />
            </Link>
            <div className="flex gap-x-8">
              <ThemeSwitch className="-m-2.5" />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg dark:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {session ? (
                  <div>
                    <Link href="/profile" className="flex items-center gap-x-6">
                      <Image
                        alt="user-image"
                        className="w-8 rounded-full"
                        src={session?.user?.image ?? ""}
                      />
                      <p className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg b:bg-gray-50 dark:text-white">
                        {session?.user?.name}
                      </p>
                    </Link>
                    <Link
                      onClick={() => signOut()}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white"
                    >
                      Log Out
                    </Link>
                  </div>
                ) : (
                  <Link
                    onClick={() => signIn()}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white"
                  >
                    Log In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
