import { createSessionClient } from "@/lib/appwrite";
import { Project } from "./types";
import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { getMember } from "../members/utils";

interface GetWorkspaceProps {
  projectId: string;
}
export const getProject = async ({
  projectId,
}: GetWorkspaceProps): Promise<Project> => {
  const { databases, account } = await createSessionClient();

  const user = await account.get();

  const project = await databases.getDocument<Project>(
    DATABASE_ID,
    PROJECTS_ID,
    projectId
  );

  const member = await getMember({
    databases,
    userId: user.$id,
    workspaceId: project.workspaceId,
  });

  if (!member) {
    throw new Error("Unauthorized");
  }

  return project;
};
