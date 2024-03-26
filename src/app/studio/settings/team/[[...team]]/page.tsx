"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { LoadingPage } from "~/components/global/loading";
import ServerError from "~/components/global/server-error";
import { api } from "~/trpc/react";
import { type UserWithData } from "~/types";

export default function TeamSettings() {
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

  return (
    <div>
      <h1>Team Settings</h1>
      <p>Team settings page</p>
    </div>
  );
}
