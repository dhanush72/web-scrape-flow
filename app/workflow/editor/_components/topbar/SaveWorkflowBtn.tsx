'use client';

import { updateWorkflow } from '@/app/actions/workflows/query';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { CheckIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const SaveWorkflowBtn = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();

  const { mutate, isPending } = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: () => {
      toast.success('Workflow updated', { id: 'save-workflow' });
    },
    onError: () => {
      toast.success('Failed to update workflow', { id: 'save-workflow' });
    },
  });

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading('Saving workflow...', { id: 'save-workflow' });
        mutate({
          id: workflowId,
          definition: workflowDefinition,
        });
      }}
      disabled={isPending}
    >
      <CheckIcon size={16} className="stroke-gray-400" />
      Save
    </Button>
  );
};

export default SaveWorkflowBtn;
