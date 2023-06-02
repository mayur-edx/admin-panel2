/* eslint-disable @typescript-eslint/ban-ts-comment */
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Input, Label, Spinner } from "reactstrap";
import * as Yup from "yup";
import { CreateRoleAPI } from "../../actions/roleAPI/CreateRoleAPI";
import { GetByRoleAPI, IGetByRoleAPIresData } from "../../actions/roleAPI/GetByRoleAPI";
import { GetRoleAPI } from "../../actions/roleAPI/GetRoleAPI";
import { GetRolePermissionAPI } from "../../actions/roleAPI/GetRolePermissionAPI";
import { UpdateRoleAPI } from "../../actions/roleAPI/UpdateRoleAPI";
import SwitchComponent from "../../components/SwitchComponent";
import { useDebouncedEffect } from "../../hooks";
import useDeleteRestricted from "../../hooks/restrictions/useDeleteRestricted";
import { setLoading } from "../../store";
import { ModuleName, debounceTimeInMilliseconds } from "../../utils/constants/Constants";
import { toastSuccess } from "../../utils/functions";
import { handleFormikTrim } from "../../utils/functions/CommonFunctions";
import SubPermission from "./components/SubPermission";

const RoleForm = () => {
	const createPath = "/role-management/create";
	const params = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { deleteRestrictedPermission } = useDeleteRestricted();

	const [isLoading, setIsLoading] = useState(false);
	const [roleAlredyError, setRoleAlredyError] = useState(false);
	const [resData, setResData] = useState<IGetByRoleAPIresData>();
	const [data, setData] = useState<any>({});

	const formik = useFormik({
		initialValues: {
			roleName: "",
			roleLevel: false
		},
		validationSchema: Yup.object().shape({
			roleName: Yup.string().required("Role name is required").min(2, "Role name must be at least 2 characters").max(60, "Role name should not exceed 60 characters")
		}),
		onSubmit: (value) => {
			if (!roleAlredyError) {
				dispatch(setLoading(true));
				if (createPath === location.pathname) {
					const body = { ...value, permission: data };
					CreateRoleAPI(body).then((res) => {
						if (res.status === 200) {
							navigate("/role-management");
							toastSuccess(res.message);
							dispatch(setLoading(false));
						}
					});
				} else {
					const body: any = {
						permission: data
					};
					if (resData?.roleName !== value.roleName) {
						body.roleName = value.roleName;
					}
					if (resData?.roleId) {
						UpdateRoleAPI({ roleId: resData?.roleId, data: body }).then((res) => {
							if (res.status === 200) {
								navigate("/role-management");
								toastSuccess(res.message);
								dispatch(setLoading(false));
							}
						});
					}
				}
			}
		}
	});
	const { values, handleBlur, handleSubmit, errors, touched, setFieldValue } = formik;

	const handleLevel = (label: string, keyName: string, checked: boolean) => {
		setFieldValue("roleLevel", checked);
	};

	const getByRoleAction = (roleId: string) => {
		GetByRoleAPI({ roleId })
			.then((res) => {
				if (res.status === 200) {
					setResData(res.data);
					setFieldValue("roleName", res.data.roleName);
					setData(res.data.permission);
					setFieldValue("permission", res.data.permission);
					setIsLoading(false);
				}
			})
			.catch(() => navigate("/role-management"));
	};

	const getPermissionAction = () => {
		GetRolePermissionAPI()
			.then((res) => {
				if (res.status === 200) {
					setData(res.data);
					setIsLoading(false);
				}
			})
			.catch(() => {
				setIsLoading(false);
				navigate("/role-management");
			});
	};

	useEffect(() => {
		setIsLoading(true);
		if (createPath !== location.pathname && params?.roleId) {
			getByRoleAction(params?.roleId);
		} else {
			getPermissionAction();
		}
	}, []);

	useDebouncedEffect(
		() => {
			if (createPath === location.pathname && values?.roleName) {
				GetRoleAPI({ roleName: values?.roleName })
					.then((res) => {
						if (res.status === 200) {
							setRoleAlredyError(false);
						}
					})
					.catch((err) => {
						if (err.data.status === 409) {
							setRoleAlredyError(true);
						}
					});
			}
		},
		debounceTimeInMilliseconds,
		[values?.roleName]
	);

	return (
		<div className="holders">
			<h2 className="c-black fw-600">Role Form</h2>
			<div className="bg-white mt-10 rounded-1 p-20">
				<div className="d-flex align-items-center">
					<FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer c-black" onClick={() => navigate("/role-management")} />
					<span className="cursor-pointer c-black ml-10" onClick={() => navigate("/role-management")}>
						Back
					</span>
				</div>

				{isLoading ? (
					<div className="d-flex justify-content-center align-items-center">
						<span className="fw-600 mr-10">Loading...</span>
						<Spinner size={"sm"} />
					</div>
				) : (
					<>
						<div className="mt-10">
							<Label className="c-black fw-600" htmlFor="roleName">
								Role Name
							</Label>
							<Input
								placeholder="Role Name"
								name="roleName"
								invalid={Boolean(roleAlredyError ? true : touched?.roleName && errors?.roleName)}
								id="roleName"
								value={values.roleName}
								onChange={(e) => handleFormikTrim("roleName", e.target.value, setFieldValue)}
								onBlur={handleBlur}
							/>
							{roleAlredyError ? (
								<span className="text-danger text-capitalize">Role name already in use</span>
							) : (
								touched?.roleName && errors?.roleName && <span className="text-danger text-capitalize">{errors?.roleName}</span>
							)}
						</div>
						{createPath === location.pathname ? (
							<div className="mt-15 d-flex align-items-center">
								<Label className="c-black fw-600 mb-0" htmlFor="name">
									Role Permission
								</Label>
								<SwitchComponent
									disabled={deleteRestrictedPermission(ModuleName.ROLE_MANAGEMENT)}
									checked={values.roleLevel}
									handleChange={handleLevel}
									keyName={"Same Level"}
									label="dsds"
									className="ml-10"
								/>
							</div>
						) : null}
						<div className="mt-20 p-2 overflow-hidden border-grey" style={{ border: "1px solid", borderRadius: "5px" }}>
							<div className="row">
								{Object.keys(data).map((key, index) => (
									<SubPermission key={index} data={data[key]} name={key} setData={setData} mainData={data} moduleName={name} />
								))}
							</div>
						</div>
						<button type="submit" className="custom-primary mt-20" onClick={() => handleSubmit()}>
							Submit
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default RoleForm;
