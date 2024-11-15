import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.auth)["sign-in"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.auth)["sign-in"]["$post"]
>;

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth["sign-in"].$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Signed in successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Failed to sign in");
    },
  });

  return mutation;
};
