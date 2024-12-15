'use client';

import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/Header';

import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center w-full px-4">
          <SidebarTrigger />
          <Header />
        </div>
        <Separator />
        <main className="flex flex-col gap-4 flex-1 p-4 text-muted-foreground">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
