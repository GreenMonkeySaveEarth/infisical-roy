import { faKey, faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Td, Tr } from "@app/components/v2";
import { TUserSecret } from "@app/hooks/api/userSecret";
import { UsePopUpState } from "@app/hooks/usePopUp";

export const UserSecretsRow = ({
  row,
  handlePopUpOpen
}: {
  row: TUserSecret;
  handlePopUpOpen: (
    popUpName: keyof UsePopUpState<["updateUserSecret", "deleteUserSecretConfirmation"]>,
    {
      name,
      id,
      value
    }: {
      name: string;
      id: string;
      value?: TUserSecret;
    }
  ) => void;
}) => {
  return (
    <>
      <Tr
        key={row.id}
      >
        <Td>
          <FontAwesomeIcon icon={faKey} />
        </Td>
        <Td>{row.name ? `${row.name}` : "-"}</Td>
        <Td>
          {/*
            I decide to hide the password for simplicity. I can see the improvement, 
            such as hiding/showing the password value. 
            However, this can be another product decision.  
          */}
          <span>*********</span>
        </Td>
        <Td>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handlePopUpOpen("updateUserSecret", {
                name: "update",
                id: row.id,
                value: row
              });
            }}
            variant="plain"
            ariaLabel="update"
          >
            <FontAwesomeIcon icon={faPencil} />
          </IconButton>
        </Td>
        <Td>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handlePopUpOpen("deleteUserSecretConfirmation", {
                name: "delete",
                id: row.id
              });
            }}
            variant="plain"
            ariaLabel="delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </Td>
      </Tr>
    </>
  );
};
