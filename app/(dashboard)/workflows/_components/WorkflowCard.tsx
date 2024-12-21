'use client';

import { Card, CardContent } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { WorkflowStatus } from '@/types/workflow';
import { Workflow } from '@prisma/client';
import { FileTextIcon, PlayIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import WorkflowActions from './WorkflowActions';

type Props = {
  workflow: Workflow;
};

const statusColor = {
  [WorkflowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
  [WorkflowStatus.PUBLISHED]: 'bg-primary',
};

const WorkflowCard = ({ workflow }: Props) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
      <CardContent
        className={cn('p-4 flex items-center justify-between h-[100px]')}
      >
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              'size-10 rounded-full flex items-center  justify-center',
              statusColor[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="size-5" />
            ) : (
              <PlayIcon className="size-5" />
            )}
          </div>

          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              <Link href={`/workflows/editor/${workflow.id}`}>
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>

        <WorkflowActions workflow={workflow} />
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;
