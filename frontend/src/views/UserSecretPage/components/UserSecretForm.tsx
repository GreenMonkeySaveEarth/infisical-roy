import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createNotification } from "@app/components/notifications";
import { Button, FormControl, Input } from "@app/components/v2";
import { TUserSecret, useCreateUserSecret, useUpdateUserSecret } from "@app/hooks/api";

type UserSecretFormProps = {
	type: string;
	value?: TUserSecret | null;
	afterSubmit?: () => void;
};

const schema = z.object({
	name: z.string(),
	password: z.string(),
});

export type FormData = z.infer<typeof schema>;

export const UserSecretForm = ({ type, value, afterSubmit }: UserSecretFormProps) => {
	// Reuse the same form component for both create and update operations on user secrete web login for simplicity.
	const {
		control,
		reset,
		handleSubmit,
		formState: { isSubmitting }
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: value?.name || "",
			password: value?.password || ""
		}
	});
	const createUserSecret = useCreateUserSecret();
	const updateUserSecret = useUpdateUserSecret();

	const onFormSubmit = async ({
		name,
		password,
	}: FormData) => {

		try {
			// Split the create or update logic based on the value prop.
			if (type.toLowerCase() === "update") {
				await updateUserSecret.mutateAsync({
					id: value?.id,
					name,
					password,
				});
			} else if (type.toLowerCase() === "create") {
				// Otherwise, create a new secret
				await createUserSecret.mutateAsync({
					name,
					password,
				});
			}
			reset();
			createNotification({
				text: "Create a new web login secrete.",
				type: "success"
			});
		} catch (error) {
			console.error(error);
			createNotification({
				text: "Failed to create a web login secret.",
				type: "error"
			});
		} finally {
			afterSubmit && afterSubmit();
		}
	};

	return (
		<form onSubmit={handleSubmit(onFormSubmit)}>
			{/* Name */}
			<Controller
				control={control}
				name="name"
				render={({ field, fieldState: { error } }) => (
					<FormControl
						label="Name"
						isError={Boolean(error)}
						errorText={error?.message}
					>
						<Input {...field} placeholder="Name" type="text" />
					</FormControl>
				)}
			/>
			{/* Password */}
			<Controller
				control={control}
				name="password"
				render={({ field, fieldState: { error } }) => (
					<FormControl
						label="Password"
						isError={Boolean(error)}
						errorText={error?.message}
					>
						<Input {...field} placeholder="Password" type="password" />
					</FormControl>
				)}
			/>
			<Button
				className="mt-4"
				size="sm"
				type="submit"
				isLoading={isSubmitting}
				isDisabled={isSubmitting}
			>
				{`${type} User Secret`}
			</Button>
		</form>
	)
}
