import { currentUser } from "@clerk/nextjs";
import ServerError from "~/components/global/server-error";
import { api } from "~/trpc/server";
import Navigation from "./_components/studio-navigation";

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

  // This function will load the user from the database if it exists, or create it if it doesn't
  // and also create a new agency
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
      <Navigation user={user} />
      <pre>{JSON.stringify(userFromDb, null, "\t")}</pre>
    </>
  );
}
