import { useSelector } from "react-redux";
import { IrootSlice } from "../../store/Store";

const useCreateRestricted = () => {
	const permissionSlice = useSelector((state: IrootSlice) => state.permission);
	const createRestrictedPermission = (subModule: string) => {
		return permissionSlice?.permission?.[subModule]?.create;
	};

	return { createRestrictedPermission };
};

export default useCreateRestricted;
