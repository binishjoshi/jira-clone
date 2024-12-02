import Link from "next/link";
import { redirect } from "next/navigation";
import { PencilIcon } from "lucide-react";

import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";

import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Button } from "@/components/ui/button";

interface ProjectIdPageProps {
  params: {
    projectId: string;
  };
}

export default async function ProjectIdPage({ params }: ProjectIdPageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({ projectId: params.projectId });

  if (!initialValues) {
    throw new Error("Project not found");
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            className="size-8"
            name={initialValues.name}
            image={initialValues.imageUrl}
          />
          <p className="text-lg font-semibold">{initialValues.name}</p>
        </div>
        <div className="">
          <Button variant="secondary" asChild size="sm">
            <Link
              href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" /> Edit Project
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
