import { FC } from "react";
import ReactSwitch from "react-switch";
import { primaryColor } from "../utils/constants/Constants";

interface ISwitchComponent {
	checked: boolean;
	label: string;
	keyName: string;
	handleChange: (label: string, keyName: string, checked: boolean) => void;
	className?: string;
	disabled: boolean;
}

const SwitchComponent: FC<ISwitchComponent> = ({ checked, handleChange, label, keyName, ...reset }) => {
	const onChanges = (e: boolean) => {
		handleChange(label, keyName, e);
	};
	return <ReactSwitch height={17} onColor={primaryColor} handleDiameter={15} width={30} uncheckedIcon={false} checkedIcon={false} onChange={onChanges} checked={checked} {...reset} />;
};

export default SwitchComponent;
