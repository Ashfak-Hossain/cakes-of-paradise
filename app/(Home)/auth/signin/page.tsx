import Image from 'next/image';

import { CardWrapper } from '@/components/authentication/card-wrapper';
import SignInForm from '@/components/authentication/signin-form';

const SignInPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-black">
      <div className="flex items-center justify-center p-6 sm:p-10">
        <CardWrapper
          headerTitle="Welcome Back!"
          headerSubTitle="Sign in to pick up where you left off."
          backButtonLabel="Don't Have an Account ? Sign Up"
          backButtonHref="/auth/signup"
          showSocial
        >
          <SignInForm />
        </CardWrapper>
      </div>
      <div className="relative hidden lg:block border m-3 rounded-lg overflow-hidden">
        <Image
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          width={500}
          height={500}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>
      </div>
    </div>
  );
};

export default SignInPage;
