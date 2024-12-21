import { SecretSharingAccessType } from "../secretSharing/types";

export type TUserSecret = {
  id: string;
  name: string | null;
  password: string;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TCreatedUserSecret = {
  id: string;
};

export type TCreateUserSecretRequest = {
  name?: string;
  password?: string;
};

export type TUpdateUserSecretRequest = {
  id: string;
  name: string;
  password: string;
};

export type TDeleteUserSecretRequest = {
  id: string;
};
