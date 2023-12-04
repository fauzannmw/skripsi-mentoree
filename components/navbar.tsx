"use client";

import React from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Image } from "@nextui-org/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { MentoreeIcon } from "./icons";

export const NavbarGlobal = () => {
  const { data: session } = useSession();
  const navigation = [
    { name: "About", href: "/about" },
    { name: "Explore", href: "/explore" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:gap-x-12 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Mentoree</span>
            <MentoreeIcon />
          </a>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-12">
          {session ? (
            <div className="flex gap-x-12">
              <a href="/profile" className="flex flex-row items-center gap-x-6">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {session?.user?.name}
                </p>
                <Image
                  className="w-8 rounded-full"
                  src={session?.user?.image ?? ""}
                />
              </a>
              <ThemeSwitch />
              <button
                onClick={() => signOut()}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log Out <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-sm font-semibold leading-6 text-gray-900"
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
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <MentoreeIcon />
            </a>
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
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {session ? (
                  <div>
                    <a href="/profile" className="flex items-center gap-x-6">
                      <Image
                        className="w-8 rounded-full"
                        src={session?.user?.image ?? ""}
                      />
                      <p className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50">
                        {session?.user?.name}
                      </p>
                    </a>
                    <a
                      onClick={() => signOut()}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log Out
                    </a>
                  </div>
                ) : (
                  <a
                    onClick={() => signIn()}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log In
                  </a>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
