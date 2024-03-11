import PageWrapper from "~/components/global/page-wrapper";
import { api } from "~/utils/api";

const Studio = () => {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <PageWrapper>
      {hello.data ? hello.data.greeting : "Loading tRPC query..."}
    </PageWrapper>
  );
};

export default Studio;
