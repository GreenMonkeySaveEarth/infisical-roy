import Head from "next/head";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createNotification } from "@app/components/notifications";
import { Button, DeleteActionModal } from "@app/components/v2";
import { usePopUp } from "@app/hooks";
import { useDeleteUserSecret } from "@app/hooks/api/userSecret";

import { AddUserSecretModal } from "./AddUserSecretModal";
import { UpdateUserSecretModal } from "./UpdateUserSecretModal";
import { UserSecretsTable } from './UserSecretsTable';

type DeleteModalData = { name: string; id: string };

export const UserSecretsSection = () => {
	const deleteUserSecret = useDeleteUserSecret();
	const { popUp, handlePopUpToggle, handlePopUpClose, handlePopUpOpen } = usePopUp([
		"createUserSecret",
		"updateUserSecret",
		"deleteUserSecretConfirmation"
	] as const);

	const onDeleteApproved = async () => {
		try {
			deleteUserSecret.mutateAsync({
				id: (popUp?.deleteUserSecretConfirmation?.data as DeleteModalData)?.id
			});
			createNotification({
				text: "Successfully deleted user secret",
				type: "success"
			});

			handlePopUpClose("deleteUserSecretConfirmation");
		} catch (err) {
			console.error(err);
			createNotification({
				text: "Failed to delete user secret",
				type: "error"
			});
		}
	};

	return (
		<div className="mb-6 rounded-lg border border-mineshaft-600 bg-mineshaft-900 p-4">
			<Head>
				<title>User secretes</title>
				<link rel="icon" href="/infisical.ico" />
				<meta property="og:image" content="/images/message.png" />
			</Head>
			<div className="mb-4 flex justify-between">
				<p className="text-xl font-semibold text-mineshaft-100">Web Login</p>
				<Button
					colorSchema="primary"
					leftIcon={<FontAwesomeIcon icon={faPlus} />}
					onClick={() => {
						handlePopUpOpen("createUserSecret", {
							name: "create"
						});
					}}
				>
					Add web login
				</Button>
			</div>
			<UserSecretsTable handlePopUpOpen={handlePopUpOpen} />
			<AddUserSecretModal popUp={popUp} handlePopUpToggle={handlePopUpToggle} handlePopUpClose={handlePopUpClose} />
			<UpdateUserSecretModal popUp={popUp} handlePopUpToggle={handlePopUpToggle} handlePopUpClose={handlePopUpClose} />
			<DeleteActionModal
				isOpen={popUp.deleteUserSecretConfirmation.isOpen}
				title={`Delete ${(popUp?.deleteUserSecretConfirmation?.data as DeleteModalData)?.name || " "
					} user secret?`}
				onChange={(isOpen) => handlePopUpToggle("deleteUserSecretConfirmation", isOpen)}
				deleteKey={(popUp?.deleteUserSecretConfirmation?.data as DeleteModalData)?.name}
				onClose={() => handlePopUpClose("deleteUserSecretConfirmation")}
				onDeleteApproved={onDeleteApproved}
			/>
		</div>
	);
};
