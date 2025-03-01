'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Route } from 'next';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { SignInResponse } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { FormError } from '@/components/authentication/form-error';
import { FormSuccess } from '@/components/authentication/form-success';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignIn, SignInSchema } from '@/schemas/auth';

const SignInForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get('callbackUrl');

  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider'
      : '';

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const defaultValues: SignIn = { email: '', password: '' };

  const form = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = async (values: SignIn) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      try {
        await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: false,
        }).then((res: SignInResponse | undefined) => {
          if (!res) {
            setError('No Response!');
          }
          if (!res?.ok) {
            setError('Something went wrong.');
          } else if (res.error) {
            if (res.error == 'CallbackRouteError')
              setError('Could not login! Please check your credentials.');
            else setError(`Internal Server Error: ${res.error}`);
          } else {
            if (callbackUrl) router.push(callbackUrl as Route);
            else router.push('/');
          }
        });
      } catch (error: any) {
        setSuccess('');
        setError(error);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email..." {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password..." {...field} type="password" />
                  </FormControl>
                  <Button variant="link" size="sm" asChild className="px-0 font-normal">
                    <Link href="/auth/reset">Forgot password?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        </div>
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-3 size-4 animate-spin" />}
          {isPending ? 'Signing in ...' : 'Sign in'}
          {!isPending && <span className="ml-2">&rarr;</span>}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
