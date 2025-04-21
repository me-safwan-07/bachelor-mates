import React from 'react';
import { IconBrandGithub } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';

export default function CtaGithub() {
  return (
    <Button variant='ghost' size='sm' className='hidden sm:flex'>
      <a
        href='https://github.com/Kiranism/next-shadcn-dashboard-starter'
        rel='noopener noreferrer'
        target='_blank'
        className='dark:text-foreground'
      >
        <IconBrandGithub />
      </a>
    </Button>
  );
}
