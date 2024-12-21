'use server';

import prisma from '@/prisma';
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from '@/schema/Worklfow';
import { WorkflowStatus } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getUserWorkflows() {
  try {
    const { userId } = auth();
    if (!userId) throw new Error('Unauthorized');

    const workflows = await prisma.workflow.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });

    return workflows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function createWorkflow(workflow: createWorkflowSchemaType) {
  const { error, data } = createWorkflowSchema.safeParse(workflow);

  if (error) {
    console.error('Schema validation error:', error.errors);
    throw new Error('Invalid form data');
  }

  const { userId } = auth();
  if (!userId) throw new Error('Unauthorized: userId is missing');

  const payload = {
    userId,
    definition: 'TODO',
    status: WorkflowStatus.DRAFT,
    ...data,
  };

  const result = await prisma.workflow.create({
    data: payload,
  });

  redirect(`/workflows/editor/${result.id}`);
}

export async function deleteWorkflow(workflowId: string) {
  const { userId } = auth();
  if (!userId) throw new Error('Unauthorized: userId is missing');

  await prisma.workflow.delete({
    where: {
      userId,
      id: workflowId,
    },
  });

  revalidatePath('/workflows');
}

export async function updateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  const { userId } = auth();
  if (!userId) throw new Error('Unauthorized: userId is missing');

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) throw new Error('Workflow not found');

  if (workflow.status !== WorkflowStatus.DRAFT)
    throw new Error('Workflow is not a draft');

  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      definition,
    },
  });

  revalidatePath('/workflows');
}
