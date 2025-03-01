import { CheckCircle } from 'lucide-react';

export const FormSuccess: React.FC<{ message?: string }> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircle className="size-4" />
      <p>{message}</p>
    </div>
  );
};
