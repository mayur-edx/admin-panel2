import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { IrootSlice } from "../../store/Store";

const ViewRestricted = ({ subModule, children }: { subModule: string; children: ReactNode }) => {
	const permissionSlice = useSelector((state: IrootSlice) => state.permission);
	if (permissionSlice?.permission?.[subModule]?.view) {
		return <>{children}</>;
	}
	return null;
};

export default ViewRestricted;
