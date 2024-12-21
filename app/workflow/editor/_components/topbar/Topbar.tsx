'use client';

import TooltipWrapper from '@/components/TooltipWrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import SaveWorkflowBtn from './SaveWorkflowBtn';

type Props = {
  title: string;
  subTitle?: string;
  workflowId: string;
};

const Topbar = ({ title, subTitle, workflowId }: Props) => {
  const router = useRouter();
  return (
    <header className="flex p-2 border-2 border-separate justify-between items-center w-full h-[60px] sticky top-0 bg-background z-10">
      <div className="flex items-center gap-1 flex-1">
        <TooltipWrapper content="Back">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeftIcon size={20} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="font-bold text-ellipsis truncate">{title}</p>
          {subTitle && (
            <p className="text-xs text-muted-foreground truncate text-ellipsis">
              {subTitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-1 flex-1 justify-end">
        <SaveWorkflowBtn workflowId={workflowId} />
      </div>
    </header>
  );
};

export default Topbar;
