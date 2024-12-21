import { TGenericPermission } from "@app/lib/types";

export type TGetUserSecretsDTO = {
  orgId: string;
} & TGenericPermission;

export type TCreateUserSecretDTO = {
  name: string,
  password: string,
  orgId: string;
}

export type TUpdateUserSecretDTO = {
  userSecretId: string;
  name: string;
  password: string;
};


export type TDeleteUserSecretDTO = {
  userSecretId: string;
};
