import { currentUser } from "@clerk/nextjs";
import Navigation from "~/components/global/navigation";
import ServerError from "~/components/global/server-error";
import PageWrapper from "~/layouts/page-wrapper";

export default async function Studio() {
  const user = await currentUser();

  if (!user?.emailAddresses[0]?.emailAddress)
    return (
      <ServerError
        code={500}
        message="Something went wrong. Please try again."
      />
    );

  // const userFromDb = await api.user.getByEmail({
  //   email: user?.emailAddresses[0]?.emailAddress,
  // });

  return (
    <PageWrapper>
      <Navigation
        user={{
          avatar: user?.imageUrl,
          firstName: user?.firstName ?? undefined,
          lastName: user?.lastName ?? undefined,
        }}
      />
      <div className="mb-3 flex flex-col p-3 sm:flex-row">
        {/* <Sidebar user={userFromDb} /> */}

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
      </div>
    </PageWrapper>
  );
}
