// app/studio/project/$id.page.tsx
"use client";

import { useParams } from "next/navigation";
import { LoadingPage } from "~/components/global/loading";
import ServerError from "~/components/global/server-error";
import { api } from "~/trpc/react";

export default function ProjectPage() {
  const { id } = useParams();
  const { data: project, isLoading } = api.projects.getById.useQuery({
    id: id?.toString() ?? "",
  });

  if (isLoading) return <LoadingPage />;
  if (!project)
    return (
      <ServerError
        code={404}
        message="The project you are looking for does not exist."
      />
    );

  return (
    <div>
      <h1>Project Details</h1>
      <pre>{JSON.stringify(project, null, 2)}</pre>
    </div>
  );
}
