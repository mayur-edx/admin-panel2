import { useSelector } from "react-redux";
import { IrootSlice } from "../../store/Store";

const useEditRestricted = () => {
	const permissionSlice = useSelector((state: IrootSlice) => state.permission);
	const editRestrictedPermission = (subModule: string) => {
		return permissionSlice?.permission?.[subModule]?.update;
	};

	return { editRestrictedPermission };
};

export default useEditRestricted;
