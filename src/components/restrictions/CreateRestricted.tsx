import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { IrootSlice } from "../../store/Store";

const CreateRestricted = ({ subModule, children }: { subModule: string; children: ReactNode }) => {
	const permissionSlice = useSelector((state: IrootSlice) => state.permission);
	if (permissionSlice?.permission?.[subModule]?.create) {
		return <>{children}</>;
	}
	return null;
};

export default CreateRestricted;
