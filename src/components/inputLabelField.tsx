import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { useDebouncedEffect } from "../hooks";
import { debounceTimeInMilliseconds } from "../utils/constants/Constants";
import CustomTooltip from "./tooltip/ToolTip";

const InputLabelField: React.FC<IInputLabelField> = ({ value, keyValue, disable, lang, setFieldValue, setSaveBtnDisabled }) => {
	const [labelValue, setLabelValue] = useState<string>("");
	const [error, setError] = useState<string>("");

	useEffect(() => {
		setLabelValue(value);
	}, [value]);

	useDebouncedEffect(
		() => {
			if (value !== labelValue) {
				if (lang === "EN") {
					setFieldValue(`EN.${keyValue}`, labelValue);
				} else {
					setFieldValue(`DE.${keyValue}`, labelValue);
				}
			}
		},
		debounceTimeInMilliseconds,
		[labelValue]
	);

	const handleChange = (e: any) => {
		setSaveBtnDisabled && setSaveBtnDisabled(false);
		setFieldValue("language", lang);
		setLabelValue(e.target.value);
		if (e.target.value) {
			setError("");
			setFieldValue("disable", false);
		} else {
			setError("Value is required");
			setFieldValue("disable", true);
		}
	};

	return (
		<div className="col-4">
			{!disable ? (
				<CustomTooltip content={labelValue} direction="bottom" className="w-100">
					<Input disabled={!disable} type="text" style={{ borderColor: error ? "red" : "" }} onChange={handleChange} value={labelValue} />
					{error && <span className="text-danger">{error}</span>}
				</CustomTooltip>
			) : (
				<>
					<Input disabled={!disable} type="text" style={{ borderColor: error ? "red" : "" }} onChange={handleChange} value={labelValue} />
					{error && <span className="text-danger">{error}</span>}
				</>
			)}
		</div>
	);
};

export default React.memo(InputLabelField);
interface IInputLabelField {
	value: string;
	keyValue: any;
	disable: boolean;
	setSaveBtnDisabled?: (value: boolean) => void;
	lang: string;
	setFieldValue: (key: any, value: any) => void;
}
