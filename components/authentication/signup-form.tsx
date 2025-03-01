'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormError } from '@/components/authentication/form-error';
import { FormSuccess } from '@/components/authentication/form-success';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateUserMutation } from '@/redux/features/api/auth/authApiSlice';
import { SignUp, SignUpSchema } from '@/schemas/auth';

export const SignUpForm = () => {
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const defaultValues: SignUp = {
    email: '',
    password: '',
    name: '',
  };

  const form = useForm<SignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = async (values: SignUp) => {
    setError('');
    setSuccess('');

    try {
      const payload = await createUser(values).unwrap();
      if (payload.success) {
        setError('');
        setSuccess('Account created successfully');
      }
    } catch (error: any) {
      setSuccess('');
      setError(error.data.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    // disabled={isPending}
                    placeholder="Name"
                    {...field}
                    className="border rounded-md px-3 py-2 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    // disabled={isPending}
                    placeholder="Email"
                    {...field}
                    type="email"
                    className="border rounded-md px-3 py-2 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    // disabled={isPending}
                    placeholder="Password"
                    {...field}
                    type={showPass ? 'text' : 'password'}
                    className="border rounded-md px-3 py-2 w-full pr-10"
                  />
                </FormControl>
                <div
                  className="absolute right-3 top-0.5 cursor-pointer text-gray-500"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={false} type="submit" className="w-full">
          {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {false ? 'Creating account...' : 'Create an account'}
        </Button>
      </form>
    </Form>
  );
};
