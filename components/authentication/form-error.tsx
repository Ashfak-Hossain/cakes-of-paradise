import { CircleAlert } from 'lucide-react';

export const FormError: React.FC<{ message?: string }> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <CircleAlert className="size-4" />
      <p>{message}</p>
    </div>
  );
};
