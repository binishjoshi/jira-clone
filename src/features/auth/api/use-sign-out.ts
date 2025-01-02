import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.auth)["sign-out"]["$post"]
>;

export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth["sign-out"].$post();
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Signed out");
      router.refresh();
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("Error signing out");
    },
  });

  return mutation;
};
