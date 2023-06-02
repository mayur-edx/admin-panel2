import { useSelector } from "react-redux";
import { IrootSlice } from "../../store/Store";

const useUpdateDeleteRestricted = () => {
	const permissionSlice = useSelector((state: IrootSlice) => state.permission);
	const updateDeleteRestrictedPermission = (subModule: string) => {
		if (permissionSlice?.permission?.[subModule]?.update && permissionSlice?.permission?.[subModule]?.delete) {
			return true;
		} else {
			return false;
		}
	};

	return { updateDeleteRestrictedPermission };
};

export default useUpdateDeleteRestricted;
