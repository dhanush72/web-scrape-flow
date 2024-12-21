import prisma from '@/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import Editor from '../_components/Editor';

const EditorId = async ({ params }: { params: { workflowId: string } }) => {
  const { workflowId } = params;
  const { userId } = auth();

  if (!userId) return <div>Unauthorized</div>;

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return <div>No workflow found</div>;
  }

  return <Editor workflow={workflow}></Editor>;
};

export default EditorId;
