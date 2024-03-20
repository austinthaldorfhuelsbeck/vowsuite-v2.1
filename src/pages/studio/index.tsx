import { useUser } from "@clerk/nextjs";
import AgencyForm from "~/components/forms/agency";
import NewUserForm from "~/components/forms/new-user";
import { LoadingPage } from "~/components/global/loading";
import Navigation from "~/components/global/navigation";
import ServerError from "~/components/server-error";
import Sidebar from "~/components/sidebar";
import PageWrapper from "~/layouts/page-wrapper";
import { api } from "~/utils/api";

const Studio = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <PageWrapper>
        <LoadingPage />
      </PageWrapper>
    );
  }

  if (!user?.emailAddresses[0]?.emailAddress)
    return (
      <ServerError
        code="500"
        message="Something went wrong. Please try again."
      />
    );

  const { data: userFromDb } = api.user.getByEmail.useQuery(
    {
      email: user?.emailAddresses[0]?.emailAddress,
    },
    { retry: 1 },
  );

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
        <Sidebar user={userFromDb} />

        {!userFromDb && (
          <NewUserForm
            user={{
              firstName: user.externalAccounts[0]?.firstName,
              lastName: user.externalAccounts[0]?.lastName,
              email: user.emailAddresses[0]?.emailAddress,
              avatar: user.imageUrl,
            }}
          />
        )}

        {userFromDb && <AgencyForm />}
      </div>
    </PageWrapper>
  );
};

export default Studio;
