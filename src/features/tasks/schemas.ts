import { z } from "zod";

import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().min(1, "Required"),
  status2: z.nativeEnum(TaskStatus, { required_error: "Required" }),
  workspaceId: z.string().trim().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.coerce.date().optional(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});
