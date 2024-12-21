
import bcrypt from "bcrypt";
import { z } from "zod";

import { TUserSecretDALFactory } from "./user-secret-dal";
import {
	TCreateUserSecretDTO,
	TDeleteUserSecretDTO,
	TGetUserSecretsDTO,
	TUpdateUserSecretDTO,
} from "./user-secret-types";

type TUserSecretServiceFactoryDep = {
	userSecretDAL: TUserSecretDALFactory;
};


export type TSecretSharingServiceFactory = ReturnType<typeof userSecretServiceFactory>;

const isUuidV4 = (uuid: string) => z.string().uuid().safeParse(uuid).success;

export const userSecretServiceFactory = ({
	userSecretDAL
}: TUserSecretServiceFactoryDep) => {
	// Only implement this endpoint with minimum functionality requirements. 
	// Intentionally leave other security checks, such as 
	// permissionService, orgDAL, kmsService, for simplicity and MVP focus. 
	const createUserSecret = async ({
		name,
		password,
		actorId,
		orgId,
	}: TCreateUserSecretDTO) => {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
		const newUserSecret = await userSecretDAL.create({
      name,
      password: hashedPassword,
			userId: actorId,
			orgId,
    });

		return { id: newUserSecret.id}
	};

	const getUserSecrets = async ({ orgId }: TGetUserSecretsDTO) => {
		const secrets = await userSecretDAL.find({orgId});
		return {secrets};
	};

	const deleteUserSecret = async ({ userSecretId }: TDeleteUserSecretDTO) => {
		const deletedUserSecret = await userSecretDAL.deleteById(userSecretId);
		return deletedUserSecret;
	};

	const updateUserSecret = async ({ userSecretId, name, password }: TUpdateUserSecretDTO) => {
		const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
		const updatedUserSecret = await userSecretDAL.updateById(userSecretId, {
			name,
			password: hashedPassword,
		});

		return { id: updatedUserSecret.id };
	}

	return {
		createUserSecret,
		deleteUserSecret,
		getUserSecrets,
		updateUserSecret,
	}
};
