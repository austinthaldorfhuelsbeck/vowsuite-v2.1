import ServerError from "~/components/global/server-error";

export default function NotFound() {
  return <ServerError code={404} message="That was not found." />;
}
