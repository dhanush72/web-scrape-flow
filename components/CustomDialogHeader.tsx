'use client';

import React from 'react';
import { DialogHeader, DialogTitle } from './ui/dialog';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

interface Props {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;

  titleClassname?: string;
  subTitleClassname?: string;
  iconClassname?: string;
}

const CustomDialogHeader = (props: Props) => {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {props.icon && (
            <props.icon
              size={30}
              className={cn('stroke-primary', props.iconClassname)}
            />
          )}

          {props.title && (
            <p className={cn('text-xl text-primary', props.titleClassname)}>
              {props.title}
            </p>
          )}

          {props.subTitle && (
            <p
              className={cn(
                'text-sm text-muted-foreground',
                props.subTitleClassname
              )}
            >
              {props.subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
};

export default CustomDialogHeader;