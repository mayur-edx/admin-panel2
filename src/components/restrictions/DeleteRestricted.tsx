import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { IrootSlice } from "../../store/Store";

const DeleteRestricted = ({ subModule, children }: { subModule: string; children: ReactNode }) => {
	const permissionSlice = useSelector((state: IrootSlice) => state.permission);
	if (permissionSlice?.permission?.[subModule]?.delete) {
		return <>{children}</>;
	}
	return null;
};

export default DeleteRestricted;
