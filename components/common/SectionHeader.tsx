interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="mb-3 space-y-2">
      <h2 className="text-2xl font-bold tracking-tight text-primary-foreground">
        {title}
      </h2>
      <p className="">{subtitle}</p>
    </div>
  );
};

export default SectionHeader;
