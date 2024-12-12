import { useState } from "react";
import { PencilIcon, XIcon } from "lucide-react";

import { useUpdateTask } from "../api/use-update-task";

import { Button } from "@/components/ui/button";
import DottedSeparator from "@/components/dotted-separator";

import { Task } from "../types";
import { Textarea } from "@/components/ui/textarea";

interface TaskDescriptionProps {
  task: Task;
}

export function TaskDescription({ task }: TaskDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);

  const { mutate: update, isPending: isUpdating } = useUpdateTask();

  const handleSave = () => {
    update({ json: { description: value }, param: { taskId: task.$id } });
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">overview</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="secondary"
        >
          {isEditing ? (
            <>
              <XIcon className="size-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <PencilIcon className="size-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      <DottedSeparator />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description"
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isUpdating}
          />
          <Button
            size="sm"
            className="w-fit ml-auto"
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving" : "Save"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">No description</span>
          )}
        </div>
      )}
    </div>
  );
}