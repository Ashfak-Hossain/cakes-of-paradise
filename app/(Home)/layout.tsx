import HomeNavbar from '@/components/navbar/HomeNavbar';

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <HomeNavbar />
      {children}
    </>
  );
};

export default layout;
