'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
interface INavLink {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<SVGSVGElement>>;
}
const links: INavLink[] = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const linkClassName = (linkHref: string) => `
    flex h-[48px] grow items-center justify-center 
    gap-2 rounded-md bg-gray-50 p-3 text-sm 
    font-medium hover:bg-sky-100 hover:text-blue-600 
    md:flex-none md:justify-start md:p-2 md:px-3
    ${pathname === linkHref ? ' bg-sky-100 text-blue-600' : ''}
  `; 

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const className = linkClassName(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={className}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
