import { Modal, ModalContent } from "@app/components/v2";
import { UsePopUpState } from "@app/hooks/usePopUp";
import { UserSecretForm } from "./UserSecretForm";
import { TUserSecret } from "@app/hooks/api/userSecret";

type UpdateUserSecretProps = {
  popUp: UsePopUpState<["updateUserSecret"]>;
  handlePopUpToggle: (
    popUpName: keyof UsePopUpState<["updateUserSecret"]>,
    state?: boolean
  ) => void;
  handlePopUpClose: (
    popUpName: keyof UsePopUpState<["updateUserSecret"]>
  ) => void;
};

type UpdateModalData = {
  name: string;
  id: string;
  value: TUserSecret
}


export const UpdateUserSecretModal = ({ popUp, handlePopUpToggle, handlePopUpClose }: UpdateUserSecretProps) => {
  return (
    <Modal
      isOpen={popUp?.updateUserSecret?.isOpen}
      onOpenChange={(isOpen: boolean) => {
        handlePopUpToggle("updateUserSecret", isOpen);
      }}
    >
      <ModalContent
        title="User Secret"
        subTitle="Securely update a user web login."
      >
        <UserSecretForm
          type={'Update'}
          value={(popUp.updateUserSecret.data as UpdateModalData)?.value}
          afterSubmit={() => {
            handlePopUpClose("updateUserSecret");
          }}
        />
      </ModalContent>
    </Modal>
  );
};
