"use client";

import Link from "next/link";
import { PencilIcon } from "lucide-react";

import { useProjectId } from "@/features/projects/hooks/use-project-id";

import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";

import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";
import { useGetProject } from "@/features/projects/api/use-get-project";

export function ProjectIdClient() {
  const projectId = useProjectId();

  const { data, isLoading } = useGetProject({ projectId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!data) {
    return <PageError message="Project not found" />;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            className="size-8"
            name={data.name}
            image={data.imageUrl}
          />
          <p className="text-lg font-semibold">{data.name}</p>
        </div>
        <div className="">
          <Button variant="secondary" asChild size="sm">
            <Link
              href={`/workspaces/${data.workspaceId}/projects/${data.$id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" /> Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher hideProjectFilter />
    </div>
  );
}
