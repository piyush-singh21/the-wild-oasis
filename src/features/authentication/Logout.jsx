import ButtonIcon from "../../ui/ButtonIcon";

import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? (
        <h2>
          <HiArrowRightOnRectangle />
        </h2>
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
}

export default Logout;
