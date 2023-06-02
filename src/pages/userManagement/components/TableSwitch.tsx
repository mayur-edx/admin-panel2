import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Label } from "reactstrap";
import { UpdateUserAPI } from "../../../actions/userAPI/UpdateUserAPI";
import ConfirmationModal from "../../../components/ConfirmationModal";
import SwitchComponent from "../../../components/SwitchComponent";
import CustomTooltip from "../../../components/tooltip/ToolTip";
import useEditRestricted from "../../../hooks/restrictions/useEditRestricted";
import { setLoading } from "../../../store";
import { ModuleName } from "../../../utils/constants/Constants";
import { toastSuccess } from "../../../utils/functions";

interface ITableSwitch {
	item: {
		firstName: string;
		lastName: string;
		userId: string;
		email: string;
		createdAt: string;
		deletedAt: string;
		isActive: boolean;
		adminRole: {
			roleName: string;
			roleId: string;
		} | null;
		createdByUser: {
			firstName: string;
			lastName: string;
			userId: string;
		} | null;
	};
}

const TableSwitch: FC<ITableSwitch> = ({ item }) => {
	const dispatch = useDispatch();
	const { editRestrictedPermission } = useEditRestricted();
	const [checked, setChecked] = useState(false);
	const [isOpen, setIsopen] = useState<any>({
		open: false,
		label: "",
		key: "",
		checked: false
	});

	useEffect(() => {
		setChecked(item?.isActive);
	}, [item]);
	const handleToggle = () => {
		setIsopen({
			open: false,
			label: "",
			key: "",
			checked: false
		});
	};

	const updateUserAction = () => {
		dispatch(setLoading(true));
		UpdateUserAPI({ userId: item?.userId, data: { isActive: !checked } })
			.then((res) => {
				if (res.status === 200) {
					setChecked(!checked);
					toastSuccess(res.message);
					handleToggle();
					dispatch(setLoading(false));
				}
			})
			.catch(() => handleToggle());
	};

	const handleDelete = (roleId: string, checked: string | boolean) => {
		setIsopen({ open: true, label: `Are you sure you want to ${checked ? "Active" : "Inactive"} ${item?.firstName + " " + item?.lastName} role ?`, checked: roleId, key: name });
	};

	return (
		<>
			<CustomTooltip direction="top" content={checked === false ? "Inactive" : "Active"}>
				<div className="d-flex align-items-center">
					<SwitchComponent
						checked={checked}
						handleChange={(key, name, checked) => handleDelete(item?.userId, checked)}
						keyName=""
						label=" "
						className=""
						disabled={!editRestrictedPermission(ModuleName?.USER_MANAGEMENT)}
					/>
					<Label className="mb-0 ml-10 cursor-pointer c-black" onClick={() => handleDelete(item?.userId, !checked)}>
						{checked === false ? "Inactive" : "Active"}
					</Label>
				</div>
			</CustomTooltip>
			<ConfirmationModal isOpen={isOpen} toggle={handleToggle} handleAction={updateUserAction} />
		</>
	);
};

export default TableSwitch;
