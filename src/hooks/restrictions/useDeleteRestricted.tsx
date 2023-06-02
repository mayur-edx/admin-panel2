import { useSelector } from "react-redux";
import { IrootSlice } from "../../store/Store";

const useDeleteRestricted = () => {
	const permissionSlice = useSelector((state: IrootSlice) => state.permission);
	const deleteRestrictedPermission = (subModule: string) => {
		return permissionSlice?.permission?.[subModule]?.delete;
	};

	return { deleteRestrictedPermission };
};

export default useDeleteRestricted;
