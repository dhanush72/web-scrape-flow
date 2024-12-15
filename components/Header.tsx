import React from 'react';
import { ModeToggle } from '@/components/ThemeModeToggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const paths = pathname === '/' ? [''] : pathname?.split('/');
  return (
    <header className="flex items-center justify-between px-0 h-[50px] w-full">
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => (
            <BreadcrumbItem key={index} className="hidden md:block">
              <BreadcrumbLink href={`/${path}`}>
                {path === '' ? '' : path}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-1">
        <ModeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
