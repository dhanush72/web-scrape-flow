import { deleteWorkflow } from '@/app/actions/workflows/query';
import { AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Workflow } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflow: Workflow;
}

const DeleteWorkflowDialog = ({ open, setOpen, workflow }: Props) => {
  const [confirmText, setConfirmText] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      toast.success('Workflow deleted successfully', { id: workflow.id });
    },
    onError: () => {
      toast.success('Failed to delete workflow', { id: workflow.id });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDescription>
            If you delete this workflow, you will not be able to recover it. If
            you are sure, enter <b>{workflow.name}</b> to confirm.
            <div className="flex flex-col py-4">
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflow.name || isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              toast.loading('Deleting workflow...', { id: workflow.id });
              mutate(workflow.id);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkflowDialog;
