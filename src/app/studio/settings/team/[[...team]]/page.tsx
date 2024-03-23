import { currentUser } from "@clerk/nextjs";
import ServerError from "~/components/global/server-error";
import { api } from "~/trpc/server";

export default async function TeamSettings() {
  const user = await currentUser();

  const email = user?.emailAddresses[0]?.emailAddress;

  const userFromDb = await api.user.getByEmail({ email: email ?? "" });

  if (!userFromDb?.agency) {
    return (
      <ServerError
        code={500}
        message={"Something went wrong. Please try again."}
      />
    );
  }

  return (
    <div>
      <h1>Team Settings</h1>
      <p>Team settings page</p>
    </div>
  );
}
