import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MutationMessages = {
  success?: string;
  error: string;
};

/**
 *
 * @param mutationFn The mutation function to be executed
 * @param messages The success and error messages to be displayed
 * @returns The result of the mutation function
 */
export const withToast = async <T>(mutationFn: Promise<T>, messages: Partial<MutationMessages>) => {
  const { success, error } = messages;
  try {
    const result = await mutationFn;
    if (success) toast.success(success);
    return result;
  } catch (err) {
    if (error) toast.error(error);
    throw err;
  }
};
