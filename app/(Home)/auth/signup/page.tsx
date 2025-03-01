import Image from 'next/image';

import { CardWrapper } from '@/components/authentication/card-wrapper';
import { SignUpForm } from '@/components/authentication/signup-form';

const SignUpPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-10">
        <CardWrapper
          headerTitle="Welcome to Our Platform"
          headerSubTitle="Let's Create your Account"
          backButtonLabel="Already Have an Account? Sign In"
          backButtonHref="/auth/signin"
          showSocial
        >
          <SignUpForm />
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

export default SignUpPage;
