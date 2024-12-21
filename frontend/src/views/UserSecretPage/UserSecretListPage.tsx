import Link from "next/link";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { UserSecretsSection } from "./components";

export const UserSecretListPage = () => {
	return (
		<div className="container mx-auto h-full w-full max-w-7xl bg-bunker-800 px-6 text-white">
			<div className="flex items-center justify-between py-6">
				<div className="flex w-full flex-col">
					<h2 className="text-3xl font-semibold text-gray-200">User Secretes</h2>
					<p className="text-bunker-300">Securely store, manage, and rotate various allowing users to input their credentials such as Web Login: Username, Password</p>
				</div>
			</div>
			<UserSecretsSection />
		</div>
	);
};
