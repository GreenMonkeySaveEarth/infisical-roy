import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@app/config/request";

import { TUserSecret } from "./types";

export const userSecretKeys = {
  allUserSecrets: () => ["userSecrets"] as const,
  specificUserSecrets: ({ offset, limit }: { offset: number; limit: number }) =>
    [...userSecretKeys.allUserSecrets(), { offset, limit }] as const,
  getSecretById: (arg: { id: string; hashedHex: string | null; password?: string }) => [
    "user-secret",
    arg
  ]
};

export const useGetUserSecrets = ({
  offset = 0,
  limit = 25
}: {
  offset: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: userSecretKeys.specificUserSecrets({ offset, limit }),
    queryFn: async () => {
      // For simplicity, we are not passing the offset and limit as query params to 
      // implement the pagination because it involves more product and UI design questions.
      // That is outside the scope of this MVP assessment.
      // const params = new URLSearchParams({
      //   offset: String(offset),
      //   limit: String(limit)
      // });

      const { data } = await apiRequest.get<{ secrets: TUserSecret[]; totalCount: number }>(
        "/api/v1/user-secrets/",
      );
      return data;
    }
  });
};