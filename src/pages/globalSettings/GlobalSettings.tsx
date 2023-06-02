import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import * as Yup from "yup";
import { GetGlobalSettingAPI, IGetGlobalSettingAPIdata } from "../../actions/globalSettingsAPI/GetGlobalSettingAPI";
import { UpdateGlobalSettingAPI } from "../../actions/globalSettingsAPI/UpdateGlobalSettingAPI";
import ConfirmationModal from "../../components/ConfirmationModal";
import { EditRestricted } from "../../components/restrictions";
import SwitchComponent from "../../components/SwitchComponent";
import CustomTooltip from "../../components/tooltip/ToolTip";
import useEditRestricted from "../../hooks/restrictions/useEditRestricted";
import { setLoading } from "../../store";
import { ModuleName, validationMessages } from "../../utils/constants/Constants";
import { toastSuccess } from "../../utils/functions";
import { handleFormikTrim } from "../../utils/functions/CommonFunctions";

const GlobalSettings = () => {
	const dispatch = useDispatch();
	const { editRestrictedPermission } = useEditRestricted();

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<IGetGlobalSettingAPIdata>();
	const [isOpen, setIsopen] = useState<any>({
		open: false,
		label: "",
		key: "",
		checked: false
	});
	const formik = useFormik({
		initialValues: {
			frgtPwdMail: ""
		},
		validationSchema: Yup.object().shape({
			frgtPwdMail: Yup.string().required(validationMessages.email.required).email(validationMessages.email.invalid)
		}),
		onSubmit: (value) => {
			setIsopen({ open: true, label: "Are you sure you want to update Email?", checked: value?.frgtPwdMail, key: "frgtPwdMail" });
		}
	});
	const { values, setFieldValue, handleBlur, touched, errors, handleSubmit } = formik;
	const handleToggle = () =>
		setIsopen({
			open: false,
			label: "",
			key: "",
			checked: false
		});

	const updateDataAction = (key: string, checked: boolean | string) => {
		dispatch(setLoading(true));
		UpdateGlobalSettingAPI({ [key]: checked }).then((res) => {
			if (res.status === 200) {
				data && setData({ ...data, [key]: checked });
				toastSuccess(res.message);
				dispatch(setLoading(false));
				handleToggle();
			}
		});
	};

	const handleChange = (label: string, key: string, checked: boolean) => setIsopen({ open: true, label: `Are you sure you want to ${checked ? "enable" : "disable"} ${label} ?`, checked, key });

	const getDataAction = () => {
		setIsLoading(true);
		GetGlobalSettingAPI()
			.then((res) => {
				if (res.status === 200) {
					setData(res.data);
					setFieldValue("frgtPwdMail", res.data?.frgtPwdMail);
					setIsLoading(false);
				}
			})
			.catch(() => setIsLoading(false));
	};

	useEffect(() => {
		getDataAction();
	}, []);

	return (
		<div className="holders">
			<h2 className="c-black fw-600">Global Settings</h2>
			<div className="bg-white mt-10 rounded-1 p-20">
				{isLoading ? (
					<div className="d-flex align-items-center justify-content-center">
						<span className="fw-600 mr-10">Loading...</span>
						<Spinner size={"sm"} />
					</div>
				) : (
					<>
						<Row className="align-items-center">
							<Col md="2">
								<Label className="fw-600 color-black1 mb-0">Under Maintenance</Label>
							</Col>
							<Col md="8" className="d-flex align-items-center">
								<CustomTooltip content={`${data?.underMaintenance ? "Active" : "Inactive"}`} direction="right">
									<SwitchComponent
										disabled={!editRestrictedPermission(ModuleName?.GLOBAL_SETTINGS)}
										className="ml-10"
										checked={data?.underMaintenance || false}
										label="Under Maintenance"
										handleChange={handleChange}
										keyName="underMaintenance"
									/>
								</CustomTooltip>
							</Col>
						</Row>
						<Row className="mt-20">
							<Col md="2">
								<Label className="fw-600 color-black1 mb-0">Coming Soon</Label>
							</Col>
							<Col md="2" className="d-flex align-items-center">
								<CustomTooltip content={`${data?.comingSoon ? "Active" : "Inactive"}`} direction="right">
									<SwitchComponent
										disabled={!editRestrictedPermission(ModuleName?.GLOBAL_SETTINGS)}
										className="ml-10"
										checked={data?.comingSoon || false}
										label="Coming Soon"
										keyName="comingSoon"
										handleChange={handleChange}
									/>
								</CustomTooltip>
							</Col>
						</Row>
						<Row className="mt-20">
							<Col md="3">
								<Label className="c-black fw-600 mb-0" htmlFor="frgtPwdMail">
									Forgot Mails sent to
								</Label>
								<Input
									type="email"
									className="mt-10"
									placeholder={"Enter Email"}
									name="frgtPwdMail"
									id="frgtPwdMail"
									disabled={!editRestrictedPermission(ModuleName?.GLOBAL_SETTINGS)}
									onChange={(e) => handleFormikTrim(e.target.name, e.target.value, setFieldValue)}
									onBlur={handleBlur}
									invalid={Boolean(touched?.frgtPwdMail && errors?.frgtPwdMail)}
									value={values.frgtPwdMail}
								/>
								{touched?.frgtPwdMail && errors?.frgtPwdMail && <span className="text-danger">{errors?.frgtPwdMail}</span>}
							</Col>
						</Row>
						<EditRestricted subModule={ModuleName?.GLOBAL_SETTINGS}>
							{data?.frgtPwdMail !== values?.frgtPwdMail ? (
								<button type="submit" className="custom-primary mt-10" disabled={Boolean(data?.frgtPwdMail === values?.frgtPwdMail)} onClick={() => handleSubmit()}>
									Update
								</button>
							) : null}
						</EditRestricted>
					</>
				)}
			</div>
			<ConfirmationModal isOpen={isOpen} toggle={handleToggle} handleAction={updateDataAction} />
		</div>
	);
};

export default GlobalSettings;
