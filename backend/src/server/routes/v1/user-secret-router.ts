import { z } from "zod";

import { UserSecretSchema } from "@app/db/schemas";
import {
  readLimit,
  writeLimit
} from "@app/server/config/rateLimiter";
import { verifyAuth } from "@app/server/plugins/auth/verify-auth";
import { AuthMode } from "@app/services/auth/auth-type";

export const registerUserSecretRouter = async (server: FastifyZodProvider) => {
	server.route({
		method: "GET",
		url: "/",
		config: {
			rateLimit: readLimit
		},
		schema: {
			response: {
				200: z.object({
					secrets: z.array(UserSecretSchema),
				})
			}
		},
		onRequest: verifyAuth([AuthMode.JWT]),
		handler: async (req) => {
			const { secrets } = await req.server.services.userSecret.getUserSecrets({
				orgId: req.permission.orgId,
			});
			return {
				secrets,
			};
		}
	});

	server.route({
		method: "POST",
		url: "/",
		config: {
			rateLimit: writeLimit
		},
		schema: {
			body: z.object({
				name: z.string(),
				password: z.string()
			}),
			response: {
				200: z.object({
					id: z.string()
				})
			}
		},
		handler: async (req) => {
			const { name, password } = req.body;
			const userSecret = await req.server.services.userSecret.createUserSecret({
				name,
				password,
				orgId: req.permission.orgId
			});
			return userSecret
		}
	});

	server.route({
		method: "PATCH",
		url: "/:id",
		config: {
			rateLimit: writeLimit
		},
		schema: {
			params: z.object({
				id: z.string()
			}),
			body: z.object({
				name: z.string(),
				password: z.string()
			}),
			response: {
				200: z.object({
					id: z.string()
				})
			}
		},
		onRequest: verifyAuth([AuthMode.JWT]),
		handler: async (req) => {
			const { id } = req.params;
			const { name, password } = req.body;
			const updatedUserSecret = await req.server.services.userSecret.updateUserSecret({
				userSecretId: id,
				name,
				password
			});

			return updatedUserSecret;
		}
	});

	server.route({
		method: "DELETE",
		url: "/:id",
		config: {
			rateLimit: writeLimit
		},
		schema: {
			params: z.object({
				id: z.string()
			}),
			response: {
				200: z.object({
					id: z.string()
				})
			}
		},
		onRequest: verifyAuth([AuthMode.JWT]),
		handler: async (req) => {
			const { id } = req.params;
			const deletedUserSecret = await req.server.services.userSecret.deleteUserSecret({userSecretId: id});

			return deletedUserSecret;
		}
	});
};
