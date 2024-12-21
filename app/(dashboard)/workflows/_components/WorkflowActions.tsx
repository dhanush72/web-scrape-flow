import TooltipWrapper from '@/components/TooltipWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Workflow } from '@prisma/client';
import { MoreVerticalIcon, ShuffleIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import DeleteWorkflowDialog from './DeleteWorkflowDialog';

type Props = {
  workflow: Workflow;
};

const WorkflowActions = ({ workflow }: Props) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <div className="flex items-center space-x-2">
      <TooltipWrapper content="Edit workflow">
        <Link
          href={`/workflows/editor/${workflow.id}`}
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            }),
            'flex items-center gap-2'
          )}
        >
          <ShuffleIcon size={16} />
        </Link>
      </TooltipWrapper>
      <>
        <DeleteWorkflowDialog
          open={showDeleteDialog}
          setOpen={setShowDeleteDialog}
          workflow={workflow}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button value="outline" size="sm">
              <TooltipWrapper content="More actions">
                <div className="flex items-center justify-center w-full h-full">
                  <MoreVerticalIcon size={18} />
                </div>
              </TooltipWrapper>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive flex items-center gap-2"
              onSelect={() => setShowDeleteDialog((prev) => !prev)}
            >
              <TrashIcon size={16} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    </div>
  );
};

export default WorkflowActions;
