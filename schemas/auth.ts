import { z } from 'zod';

//* Sign Up Schema
export const SignUpSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(5, {
    message: 'Minimum 5 characters required',
  }),
});

export type SignUp = z.infer<typeof SignUpSchema>;

//* Sign In Schema
export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(5, {
    message: 'Minimum 5 characters required',
  }),
});

export type SignIn = z.infer<typeof SignInSchema>;
