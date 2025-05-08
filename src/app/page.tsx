import CreateAccountForm from "@/components/create-account";
import DeleteAccountButton from "@/components/delete-account";
import { clientAPI } from "@/lib/constants";

const Page = async () => {
  try {
    const res = await fetch(clientAPI.account);
    const items = await res.json();
    return (
      <div className="flex flex-col items-center h-auto mt-10 justify-center">
        <div className="w-full mx-auto flex flex-col items-center justify-center">
          <table>
            <thead>
              <tr>
                <td className="pr-10 text-left">First Name</td>
                <td className="pr-10 text-left">Last Name</td>
                <td className="pr-10 text-left">Email</td>
                <td className="pr-10 text-left">Delete</td>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any) => (
                <tr className="px-x-5" key={item.email}>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>
                    <DeleteAccountButton item={item} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CreateAccountForm />
      </div>
    );
  } catch (error) {
    console.log(error);
    return <></>;
  }
};

export default Page;
