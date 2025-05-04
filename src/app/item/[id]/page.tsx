type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const res = await fetch(`http://127.0.0.1:8000/items/api/items/${params.id}`);
  const item = await res.json();
  return (
    <div>
      Page
      <div>{item.name}</div>
    </div>
  );
};

export default Page;
