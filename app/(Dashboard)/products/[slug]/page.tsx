type Params = Promise<{ slug: string }>;

interface Props {
  params: Params;
}

const Page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params;

  return (
    <div>
      <h1>Product: {slug}</h1>
    </div>
  );
};

export default Page;
