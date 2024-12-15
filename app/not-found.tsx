import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Don&apos;t worry, even the best data sometimes gets lost in the
          internet.
        </p>

        <Link href="/dashboard">
          <Button>
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
