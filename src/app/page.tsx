import CreateAccountForm from "@/components/create-account";
import { BASE_URL } from "./constants";

const Page = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/accounts/`);
    const items = await res.json();

    return (
      <div className="flex flex-col items-center h-auto mt-10 justify-center">
        {items.map((item, index) => (
          <pre key={index}>{JSON.stringify(item)}</pre>
        ))}
        <CreateAccountForm />
      </div>
    );
  } catch (error) {
    console.log(error);
    return <></>;
  }
};

export default Page;
