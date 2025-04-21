'use client';

import { BookOpen, GalleryVerticalEnd } from 'lucide-react';
import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';


export function OrgSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className='flex flex-col gap-0.5 leading-none'>
                
                <span className="hidden font-bold sm:inline-block">Bachelor-Mate</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
