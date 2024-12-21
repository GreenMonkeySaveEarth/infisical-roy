import { z } from "zod";
import { TImmutableDBKeys } from "./models";


export const UserSecretSchema = z.object({
	// Intentionally specify the name and password for the web login use case. 
	// Depending on product requirements, business needs, and other factors, there are several ways to support different user secrets.
	// Here is a straightforward data schema solution to support the following 3 types: credit card, web login, and secret note.

	// Easy type has its own table, model, service, and router. 
	// In the UserSecret table, we must create a foreign key to associate with it. 
	// This approach has some benefits: Each type can be modulized, decoupled and scales as needed. 
	// It also applies different levels of security to the table schema. 
	// Let’s discuss this more in the follow-up interview and discuss how to implement it. 

	id: z.string().uuid(),
	name: z.string(),
	password: z.string(),
	orgId: z.string().uuid(),
});

export type TUserSecret = z.infer<typeof UserSecretSchema>;
export type TUserSecretInsert = Omit<z.input<typeof UserSecretSchema>, TImmutableDBKeys>;
export type TUserSecretUpdate = Partial<Omit<z.input<typeof UserSecretSchema>, TImmutableDBKeys>>;
