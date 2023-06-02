/* eslint-disable no-debugger */
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactSelect from "react-select";
import { Input, Label, Spinner } from "reactstrap";
import * as Yup from "yup";
import { GetByRoleAPI } from "../../actions/roleAPI/GetByRoleAPI";
import { GetRoleAPI } from "../../actions/roleAPI/GetRoleAPI";
import { CreateUserAPI } from "../../actions/userAPI/CreateUserAPI";
import { GetByUserAPI, IGetByUserAPIresData } from "../../actions/userAPI/GetByUserAPI";
import { GetUserAPI } from "../../actions/userAPI/GetUserAPI";
import { UpdateUserAPI } from "../../actions/userAPI/UpdateUserAPI";
import { useDebouncedEffect } from "../../hooks";
import { setLoading } from "../../store";
import { debounceTimeInMilliseconds, primaryColor, validationMessages } from "../../utils/constants/Constants";
import { toastSuccess } from "../../utils/functions";
import { handleFormikTrim } from "../../utils/functions/CommonFunctions";
import SubPermission from "../roleManagement/components/SubPermission";

const UserForm = () => {
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const createPath = "/user-management/create";
	const [resData, setResData] = useState<IGetByUserAPIresData>();
	const [data, setData] = useState<any>();
	const [emailAlredyError, setEmailAlredyError] = useState(false);
	const userForm = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			roleId: ""
		},
		validationSchema: Yup.object().shape({
			firstName: Yup.string().required(validationMessages.firstName.required).min(2, validationMessages.firstName.min).max(60, "First Name should not exceed 60 characters"),
			lastName: Yup.string().required(validationMessages.lastName.required).min(2, validationMessages.lastName.min).max(60, "Last Name should not exceed 60 characters"),
			email: Yup.string().email(validationMessages?.email?.invalid).required(validationMessages.email.required),
			roleId: Yup.string().required("Role name is required")
		}),
		onSubmit: (value) => {
			if (!emailAlredyError) {
				dispatch(setLoading(true));
				if (createPath !== location.pathname && params?.userId) {
					const body: any = {};
					if (resData?.firstName !== value.firstName) {
						body.firstName = value.firstName.trim();
					}
					if (resData?.lastName !== value.lastName) {
						body.lastName = value.lastName.trim();
					}
					if (resData?.adminRole?.roleId !== value.roleId) {
						body.roleId = value.roleId;
					}
					body.permission = data;
					UpdateUserAPI({ userId: params?.userId, data: body }).then((res) => {
						if (res.status === 200) {
							navigate("/user-management");
							toastSuccess(res.message);
							dispatch(setLoading(false));
						}
					});
				} else {
					const body = { ...values, permission: data };
					CreateUserAPI(body).then((res) => {
						if (res.status === 200) {
							navigate("/user-management");
							toastSuccess(res.message);
							dispatch(setLoading(false));
						}
					});
				}
			}
		}
	});
	const { values, handleBlur, handleSubmit, errors, touched, setFieldValue } = userForm;
	const [isLoading, setIsLoading] = useState(false);
	const getByUserAction = (userId: string) => {
		GetByUserAPI({ userId })
			.then((res) => {
				if (res.status === 200) {
					setFieldValue("firstName", res.data.firstName);
					setFieldValue("lastName", res.data.lastName);
					setFieldValue("email", res.data.email);
					setFieldValue("roleId", res.data.adminRole.roleId);
					setData(res.data.permission);
					setResData(res.data);
					getRoleListAction(res.data.adminRole.roleId);
				}
			})
			.catch(() => {
				navigate("/user-management");
			});
	};

	const [selectData, setSelectData] = useState<any>();
	const [permissionLoading, setPermissionLoading] = useState(false);
	const [options, setOptions] = useState<any>();

	const getRoleListAction = (roleId?: string) => {
		GetRoleAPI({ limit: 20, page: 1 })
			.then((res) => {
				if (res.status === 200) {
					const optionsData = res.data.data.map((item) => {
						return { label: item.roleName, value: item.roleId };
					});
					setOptions(optionsData);
					if (roleId) {
						const newData = optionsData.find((item: any) => item.value === roleId);
						setSelectData(newData);
					}
					setIsLoading(false);
				}
			})
			.catch(() => {
				setIsLoading(false);
				navigate("/user-management");
			});
	};

	useEffect(() => {
		setIsLoading(true);
		if (createPath !== location.pathname && params?.userId) {
			getByUserAction(params?.userId);
		} else {
			getRoleListAction();
		}
	}, []);

	const handleRole = (newValue: any) => {
		setPermissionLoading(true);
		GetByRoleAPI({ roleId: newValue.value }).then((res) => {
			if (res.status === 200) {
				setData(res.data.permission);
				setSelectData(newValue);
				setFieldValue("roleId", newValue.value);
				setPermissionLoading(false);
			}
		});
	};

	useDebouncedEffect(
		() => {
			if (createPath === location.pathname && values?.email) {
				GetUserAPI({ email: values?.email })
					.then((res) => {
						if (res.status === 200) {
							setEmailAlredyError(false);
						}
					})
					.catch((err) => {
						if (err.data.status === 409) {
							setEmailAlredyError(true);
						}
					});
			}
		},
		debounceTimeInMilliseconds,
		[values.email]
	);

	return (
		<div className="holders">
			<h2 className="c-black fw-600">User Form</h2>
			<div className="bg-white mt-10 rounded-1 p-20">
				<div className="d-flex align-items-center">
					<FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer c-black" onClick={() => navigate("/user-management")} />
					<span className="cursor-pointer c-black ml-10" onClick={() => navigate("/user-management")}>
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
							<Label className="c-black fw-600" htmlFor="firstName">
								First name
							</Label>
							<Input
								placeholder="First Name"
								name="firstName"
								invalid={Boolean(touched?.firstName && errors?.firstName)}
								id="firstName"
								value={values.firstName}
								onChange={(e) => handleFormikTrim("firstName", e.target.value, setFieldValue)}
								onBlur={handleBlur}
							/>
							{touched?.firstName && errors?.firstName && <span className="text-danger text-capitalize">{errors?.firstName}</span>}
						</div>
						<div className="mt-10">
							<Label className="c-black fw-600" htmlFor="lastName">
								Last name
							</Label>
							<Input
								placeholder="Last Name"
								name="lastName"
								invalid={Boolean(touched?.lastName && errors?.lastName)}
								id="lastName"
								value={values.lastName}
								onChange={(e) => handleFormikTrim("lastName", e.target.value, setFieldValue)}
								onBlur={handleBlur}
							/>
							{touched?.lastName && errors?.lastName && <span className="text-danger text-capitalize">{errors?.lastName}</span>}
						</div>
						<div className="mt-10">
							<Label className="c-black fw-600" htmlFor="email">
								Email
							</Label>
							<Input
								placeholder="Email"
								invalid={Boolean(emailAlredyError ? true : touched?.email && errors?.email)}
								name="email"
								id="email"
								value={values.email}
								onChange={(e) => handleFormikTrim("email", e.target.value, setFieldValue)}
								onBlur={handleBlur}
								disabled={createPath !== location.pathname}
							/>
							{emailAlredyError ? (
								<span className="text-danger text-capitalize">Email already in use</span>
							) : (
								touched?.email && errors?.email && <span className="text-danger text-capitalize">{errors?.email}</span>
							)}
						</div>
						<div className="mt-10">
							<Label className="c-black fw-600" htmlFor="email">
								Role Name
							</Label>
							<ReactSelect
								theme={(theme) => ({
									...theme,
									borderRadius: 5,
									colors: {
										...theme.colors,
										primary25: "rgba(255, 139, 0, 0.1)",
										primary: primaryColor
									}
								})}
								className={`w-100 ${touched?.roleId ? (errors?.roleId ? "react-select-error" : "") : ""}`}
								id="react-select-2-listbox"
								placeholder="Role Name"
								value={selectData}
								name="roleId"
								onBlur={handleBlur}
								onChange={handleRole}
								options={options}
							/>
							{touched?.roleId && errors?.roleId && <span className="text-danger text-capitalize">{errors?.roleId}</span>}
						</div>
						{data ? (
							<div className="mt-20 p-2 overflow-hidden border-grey" style={{ border: "1px solid", borderRadius: "5px" }}>
								<div className="row">
									{permissionLoading ? (
										<div className="p-4 d-flex justify-content-center align-items-center">
											<span className="fw-600 mr-10">Loading...</span>
											<Spinner size={"sm"} />
										</div>
									) : (
										Object.keys(data).map((key, index) => <SubPermission key={index} data={data[key]} name={key} setData={setData} mainData={data} moduleName={name} />)
									)}
								</div>
							</div>
						) : null}
						<button type="submit" className="custom-primary mt-20" onClick={() => handleSubmit()}>
							Submit
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default UserForm;
