import { Modal, ModalContent } from "@app/components/v2";
import { UsePopUpState } from "@app/hooks/usePopUp";
import { UserSecretForm } from "./UserSecretForm";

type CreateModalData = {
  name: string;
  id: string;
}

type Props = {
  popUp: UsePopUpState<["createUserSecret"]>;
  handlePopUpToggle: (
    popUpName: keyof UsePopUpState<["createUserSecret"]>,
    state?: boolean
  ) => void;
  handlePopUpClose: (
    popUpName: keyof UsePopUpState<["createUserSecret"]>
  ) => void;
};

export const AddUserSecretModal = ({ popUp, handlePopUpToggle, handlePopUpClose }: Props) => {
  return (
    <Modal
      isOpen={popUp?.createUserSecret?.isOpen}
      onOpenChange={(isOpen: boolean) => {
        handlePopUpToggle("createUserSecret", isOpen);
      }}
    >
      <ModalContent
        title="User Secret"
        subTitle="Securely create a user web login."
      >
        <UserSecretForm
          type={'Create'}
          value={null}
          afterSubmit={() => {
            handlePopUpClose("createUserSecret");
          }}
        />
      </ModalContent>
    </Modal>
  );
};
