import { TGenericPermission } from "@app/lib/types";

export type TGetUserSecretsDTO = {
  orgId: string;
} & TGenericPermission;

export type TUserSecretPermission = {
  actorId: string;
  orgId: string;
};

export type TCreateUserSecretDTO = {
  name: string,
  password: string,
} & TUserSecretPermission;

export type TUpdateUserSecretDTO = {
  userSecretId: string;
  name: string;
  password: string;
};


export type TDeleteUserSecretDTO = {
  userSecretId: string;
};
