interface SectionBodyProps {
  children: React.ReactNode;
  className?: string;
}

const SectionBody: React.FC<SectionBodyProps> = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col space-y-4 rounded-lg border border-dashed p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionBody;
