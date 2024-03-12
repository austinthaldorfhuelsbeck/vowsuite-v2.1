import { useUser } from "@clerk/nextjs";
import { FolderPlusIcon } from "lucide-react";
import AgencyForm from "~/components/forms/agency";
import NewUserForm from "~/components/forms/new-user";
import { LoadingPage } from "~/components/global/loading";
import Navigation from "~/components/global/navigation";
import ServerError from "~/components/server-error";
import { Button } from "~/components/ui/button";
import PageWrapper from "~/layouts/page-wrapper";
import { api } from "~/utils/api";

const Sidebar = () => {
  return (
    <aside className="ml-3 h-full min-h-96 w-64 rounded-lg border sm:w-80">
      <nav className="flex flex-col space-y-4 p-4">
        <h1 className="text-xl font-bold">Galleries</h1>
        <Button disabled>
          <div className="flex space-x-2">
            <FolderPlusIcon className="my-auto h-5 w-5" />
            <span className="my-auto">New Gallery</span>
          </div>
        </Button>
      </nav>
    </aside>
  );
};

``;

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
    { retry: false },
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
      <div className="mb-3 flex">
        <Sidebar />

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
