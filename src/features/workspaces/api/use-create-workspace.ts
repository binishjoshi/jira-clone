import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces.$post({ form });
      return await response.json();
    },
    onSuccess: (response) => {
      toast.success("Workspace created");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      router.push(`/workspaces/${response.data.$id}`);
    },
    onError: () => {
      toast.error("Failed to create workspace");
    },
  });

  return mutation;
};
