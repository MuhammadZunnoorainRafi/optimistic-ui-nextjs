import { ExitIcon, LayersIcon } from '@radix-ui/react-icons';
import { User } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import LogoutButton from './LogoutButton';
import Link from 'next/link';

async function UserButton({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-gray-200 hover:bg-slate-300 duration-150 dark:bg-black">
            {user?.name?.slice(0, 2).toUpperCase() || 'UR'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 " align="end">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/order-history" className="flex items-center justify-">
            <LayersIcon className="w-4 h-4 mr-2" />
            Order History
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
