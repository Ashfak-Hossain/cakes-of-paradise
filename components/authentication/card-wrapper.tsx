'use client';

import { BackButton } from '@/components/authentication/back-button';
import { Header } from '@/components/authentication/header';
import { Social } from '@/components/authentication/social';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerSubTitle: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  headerTitle,
  headerSubTitle,
  backButtonLabel,
  backButtonHref,
  showSocial,
}) => {
  return (
    <Card className="w-[400px] border-none shadow-none">
      <CardHeader>
        <Header title={headerTitle} subTitle={headerSubTitle} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
