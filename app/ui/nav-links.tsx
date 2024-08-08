'use client';

import {HomeIcon, InformationCircleIcon, PhotoIcon} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    {
        name: 'Home',
        href: '/',
        icon: HomeIcon,
    },
    {
        name: 'Posts',
        href: '/posts',
        icon: PhotoIcon,
    },
    {
        name: 'About',
        href: '/about',
        icon: InformationCircleIcon
    },
    {
      name: 'Products',
      href: '/products',

    }

]

export default function NavLinks(){
    const pathname = usePathname();
    return(
        <ul className='capitalize flex flex-shrink-0 gap-5'>
        {links.map((link) => {
          return (
            <li key={link.name}>
            <Link
              key={link.name}
              href={link.href}
              className={clsx('rounded-md text-lg dark:text-gray-300 align-middle items-center px-3 py-2',
                {
                  'bg-slate-900 text-neutral-50' : pathname === link.href
                },
                {
                  'dark:hover:text-gray-100 dark:hover:bg-slate-700 hover:text-white hover:bg-slate-600' : pathname !== link.href
                }
              )}
            >
              {/* <LinkIcon className='w-7 pb-1'/> */}
              {/* <p >{link.name}</p> */}
              {link.name}
            </Link>
            </li>
          );
        })}
      </ul>
        
    )
}
