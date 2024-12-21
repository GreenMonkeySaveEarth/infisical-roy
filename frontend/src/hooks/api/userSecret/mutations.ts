import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "@app/config/request";

import { userSecretKeys } from "./queries";
import {
  TCreatedUserSecret,
  TCreateUserSecretRequest,
  TDeleteUserSecretRequest,
  TUpdateUserSecretRequest,
  TUserSecret
} from "./types";

export const useCreateUserSecret = () => {
  const queryClient = useQueryClient();
  // Function to perform the mutation
  return useMutation({
    mutationFn: async (inputData: TCreateUserSecretRequest) => {
      // Make a POST request to the API to create a new user secret
      const { data } = await apiRequest.post<TCreatedUserSecret>(
        "/api/v1/user-secrets",
        inputData
      );
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(userSecretKeys.allUserSecrets())
  });
};

export const useUpdateUserSecret = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // Function to perform the mutation
    mutationFn: async (inputData: TUpdateUserSecretRequest) => {
      // Make a PATCH request to the API to update the user secret
      const { data } = await apiRequest.patch<TCreatedUserSecret>(
        `/api/v1/user-secrets/${inputData.id}`,
        inputData
      );
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(userSecretKeys.allUserSecrets())
  });
}


export const useDeleteUserSecret = () => {
  const queryClient = useQueryClient();
  // Function to perform the mutation
  return useMutation<TUserSecret, { message: string }, { userSecretId: string }>({
    mutationFn: async ({ id }: TDeleteUserSecretRequest) => {
      // Make a DELETE request to the API to delete the user secret
      const { data } = await apiRequest.delete<TUserSecret>(
        `/api/v1/user-secrets/${id}`
      );
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(userSecretKeys.allUserSecrets())
  });
};
