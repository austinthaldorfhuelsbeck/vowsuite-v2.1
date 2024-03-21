import { currentUser } from "@clerk/nextjs";
import ServerError from "~/components/global/server-error";
import { api } from "~/trpc/server";
import Sidebar from "./_components/sidebar";

export default async function Studio() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!userEmail)
    return (
      <ServerError
        code={500}
        message="Something went wrong. Please try again."
      />
    );

  const loadOrCreateUser = async (email: string) => {
    const userResponse = await api.user.getByEmail({
      email,
    });

    if (!userResponse) {
      const newUserResponse = await api.user.createByEmail({
        email,
      });
      return newUserResponse;
    }

    return userResponse;
  };

  const userFromDb = await loadOrCreateUser(userEmail);

  return (
    <>
      <Sidebar user={userFromDb} />

      {/* {!userFromDb && (
          <NewUserForm
            user={{
              firstName: user.externalAccounts[0]?.firstName,
              lastName: user.externalAccounts[0]?.lastName,
              email: user.emailAddresses[0]?.emailAddress,
              avatar: user.imageUrl,
            }}
          />
        )}

        {userFromDb && <AgencyForm />} */}
    </>
  );
}
