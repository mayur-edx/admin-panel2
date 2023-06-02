/* eslint-disable @typescript-eslint/ban-ts-comment */
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Input } from "reactstrap";
import InputLabelField from "../../../components/inputLabelField";
import CustomTooltip from "../../../components/tooltip/ToolTip";
import useEditRestricted from "../../../hooks/restrictions/useEditRestricted";
import { IrootSlice } from "../../../store/Store";
import { ModuleName } from "../../../utils/constants/Constants";

interface ILabelComponent {
	setFieldValue: any;
	values: any;
	setSaveBtnDisabled: any;
	valueKey: any;
	handleLabelDelete: any;
}

const LabelComponent: FC<ILabelComponent> = ({ setFieldValue, values, setSaveBtnDisabled, valueKey, handleLabelDelete }) => {
	const { editRestrictedPermission } = useEditRestricted();
	const user = useSelector((state: IrootSlice) => state.userData);

	return (
		<div className="col-12 test mt-3">
			<div className="row">
				<div className="col-3">
					<Input type="text" disabled name={`${values.language}`} value={valueKey} />
				</div>
				<InputLabelField
					setFieldValue={setFieldValue}
					// @ts-ignore
					value={values.EN[`${valueKey}`]}
					keyValue={valueKey}
					lang="EN"
					disable={editRestrictedPermission(ModuleName.LABEL_MANAGEMENT)}
					setSaveBtnDisabled={setSaveBtnDisabled}
				/>
				<InputLabelField
					setFieldValue={setFieldValue}
					// @ts-ignore
					value={values.DE[`${valueKey}`]}
					keyValue={valueKey}
					lang="DE"
					disable={editRestrictedPermission(ModuleName.LABEL_MANAGEMENT)}
					setSaveBtnDisabled={setSaveBtnDisabled}
				/>
				{user?.user?.adminRole?.roleName === "root" ? (
					<div className="col-1 d-flex align-items-center">
						<CustomTooltip content="Delete Label Key" direction="bottom">
							<FontAwesomeIcon icon={faTrash} className="cursor-pointer" onClick={() => handleLabelDelete(valueKey)} />
						</CustomTooltip>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default LabelComponent;
