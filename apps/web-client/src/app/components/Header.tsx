'use client';

import React from 'react';
import Link from 'next/link';
import { useCurrentUserQuery } from '@elncr/api-service';
import { Bars } from 'react-loader-spinner';
import { Avatar, DropdownMenu } from '@medusajs/ui';
import { User, ArrowRightOnRectangle } from '@medusajs/icons';
import { firebaseAuth } from '@elncr/api-service';
import { useRouter } from 'next/navigation';

function Header() {
  const { isLoading, user } = useCurrentUserQuery();
  const router = useRouter();

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link className="block group" href="/" aria-label="Cruip">
              <span className="font-nycd text-indigo-500 font-normal text-3xl font-semibold">
                Elncr
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="flex grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                {isLoading ? (
                  <Bars
                    height="30"
                    width="30"
                    color="#4fa94d"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : user ? (
                  <DropdownMenu>
                    <DropdownMenu.Trigger asChild>
                      <Avatar
                        className="cursor-pointer"
                        src={
                          user.profileImageUrl ||
                          `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${user.email}`
                        }
                        fallback={user.email[0].toUpperCase()}
                      />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="!sm:w-[8rem]">
                      <DropdownMenu.Item
                        className="gap-x-2 cursor-pointer"
                        onClick={() => {
                          router.push('/update-profile');
                        }}
                      >
                        <User className="text-ui-fg-subtle" />
                        Update Profile
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      {user?.company && (
                        <>
                          <DropdownMenu.Item
                            className="gap-x-2 cursor-pointer"
                            onClick={() => {
                              router.push('/candidate');
                            }}
                          >
                            <ArrowRightOnRectangle className="text-ui-fg-subtle" />
                            View Your Candidate
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator />
                        </>
                      )}
                      <DropdownMenu.Item
                        className="gap-x-2 cursor-pointer"
                        onClick={async () => {
                          await firebaseAuth.signOut();
                          // reload the page
                          window.location.reload();
                        }}
                      >
                        <ArrowRightOnRectangle className="text-ui-fg-subtle" />
                        Sign out
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu>
                ) : (
                  <Link
                    className="text-sm font-medium text-indigo-500 hover:underline px-3 lg:px-5 py-2 flex items-center"
                    href="/sign-in"
                  >
                    Sign in
                  </Link>
                )}
              </li>
              <li className="ml-3">
                <Link
                  className="btn-sm text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm"
                  href="/post-a-job"
                >
                  Post a job
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
