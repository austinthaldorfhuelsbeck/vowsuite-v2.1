"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { LoadingPage } from "~/components/global/loading";
import ServerError from "~/components/global/server-error";
import { api } from "~/trpc/react";
import { type UserWithData } from "~/types";
import AgencyForm from "../_components/agency-form";

export default function AgencySettings() {
  const { user: clerkUser, isLoaded: clerkUserIsLoaded } = useUser();
  const getOrCreateByEmailMutation = api.user.getOrCreateByEmail.useMutation();
  const email = clerkUser?.emailAddresses[0]?.emailAddress;

  useEffect(() => {
    if (email) getOrCreateByEmailMutation.mutate({ email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const userFromDb = getOrCreateByEmailMutation.data as
    | UserWithData
    | undefined;

  const agencyQuery = api.agency.getById.useQuery({
    id: userFromDb?.permission?.agencyId ?? "",
  });
  const agency = agencyQuery.data;

  if (!clerkUserIsLoaded || !userFromDb) return <LoadingPage />;

  if (!clerkUser)
    return (
      <ServerError
        code={401}
        message="You are unauthorized to make that request."
      />
    );

  if (getOrCreateByEmailMutation.error)
    return (
      <ServerError
        code={500}
        message="Could not load user resource. Please try again."
      />
    );

  return agency && <AgencyForm agency={agency} />;
}
