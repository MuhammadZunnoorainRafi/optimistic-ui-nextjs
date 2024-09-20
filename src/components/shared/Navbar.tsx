import React from 'react';
import UserButton from '../auth/UserButton';
import { getUserServer } from '@/hooks/getUserServert';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import SearchBar from './SearchBar';
import Cart from './Cart';

async function Navbar() {
  const user = await getUserServer();
  return (
    <div className="mb-10">
      <div className="px-10 shadow-md py-2 flex items-center justify-between fixed inset-x-0 bg-black/40 backdrop-blur-sm ">
        <Link href="/" className="font-bold text-2xl">
          💿 Optimistic-UI
        </Link>

        <div>
          <SearchBar />
        </div>

        <div className="flex items-center justify-center gap-2">
          <ThemeToggle />
          <Cart />
          <div>
            {user ? (
              <UserButton user={user} />
            ) : (
              <Button asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
