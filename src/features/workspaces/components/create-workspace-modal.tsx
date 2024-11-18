"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

export function CreateWorkspaceModal() {
  const { isOpen, setIsOpen, close } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Create Workspace"
      description="Form to create a workspace"
    >
      <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
}
