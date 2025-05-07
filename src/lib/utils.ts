import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Cast } from '@/types/credits';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string => {
  if (!name) {
    return '?';
  }

  const nameParts = name.trim().split(' ');
  const initials = nameParts
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');

  return initials || '?';
};
