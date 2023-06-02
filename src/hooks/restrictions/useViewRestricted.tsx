import { useSelector } from "react-redux";
import { IrootSlice } from "../../store/Store";

const useViewRestricted = () => {
	const permissionSlice = useSelector((state: IrootSlice) => state.permission);
	const viewRestrictedPermission = (subModule: string) => {
		return permissionSlice?.permission?.[subModule]?.view;
	};

	return { viewRestrictedPermission };
};

export default useViewRestricted;
