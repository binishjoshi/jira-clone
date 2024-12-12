import Link from "next/link";
import { ChevronRightIcon, TrashIcon } from "lucide-react";

import { useDeleteTask } from "../api/use-delete-task";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { Button } from "@/components/ui/button";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { Project } from "@/features/projects/types";
import { Task } from "../types";
import { useRouter } from "next/navigation";

interface TaskBreadCrumbsProps {
  project: Project;
  task: Task;
}

export function TaskBreadCrumbs({ project, task }: TaskBreadCrumbsProps) {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task?",
    "This action cannot be undone.",
    "destructive"
  );

  const handleDeleteTask = async () => {
    const ok = await confirm();

    if (!ok) return;

    deleteTask(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}/tasks`);
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />
      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-6"
      />
      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition">
          {project.name}
        </p>
      </Link>
      <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
      <p className="text-sm lg:text-lg font-semibold">{task.name}</p>
      <Button
        onClick={handleDeleteTask}
        disabled={isDeleting}
        className="ml-auto"
        variant="destructive"
        size="sm"
      >
        <TrashIcon className="size-4 lg:mr-4" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  );
}
