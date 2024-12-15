'use client';

import * as React from 'react';
import {
  CreditCardIcon,
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
  SquareDashedMousePointer,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useUser } from '@clerk/nextjs';
import { TeamSwitcher } from './team-switcher';

let data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'FlowScrape',
      logo: SquareDashedMousePointer,
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: HomeIcon,
    },
    {
      title: 'Workflows',
      url: '/workflows',
      icon: Layers2Icon,
    },
    {
      title: 'Credentials',
      url: '/credentials',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Billing',
      url: '/billing',
      icon: CreditCardIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  if (user) {
    data = {
      ...data,
      user: {
        name: user.fullName as string,
        email: user.primaryEmailAddress?.emailAddress as string,
        avatar: user.imageUrl,
      },
    };
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        {/* <Logo /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
