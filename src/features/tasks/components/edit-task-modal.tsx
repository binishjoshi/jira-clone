"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";
import { EditTaskFormWrapper } from "./edit-task-form-wrapper";

export function EditTaskModal() {
  const { taskId, close } = useEditTaskModal();

  return (
    <ResponsiveModal
      open={!!taskId}
      onOpenChange={close}
      title="Create a Task"
      description="Create a task for the selected project"
    >
      {taskId && <EditTaskFormWrapper id={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
}
