import Image from 'next/image';

export const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Image
        src="/cop.jpg"
        alt="Logo"
        className="mb-4"
        width={300}
        height={300}
      />

      <p className="text-6xl font-extrabold">
        Loading
        <span className="animate-pulse">.</span>
        <span className="animate-pulse delay-150">.</span>
        <span className="animate-pulse delay-300">.</span>
      </p>
    </div>
  );
};
