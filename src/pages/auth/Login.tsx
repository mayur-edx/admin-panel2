import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input, InputGroup, InputGroupText, Label } from "reactstrap";
import * as Yup from "yup";
import { LoginAPI } from "../../actions/adminAPI/LoginAPI";
import { onLogIn, setLoading } from "../../store";
import { setPermission } from "../../store/permissionSlice";
import { setUserData } from "../../store/userDataSlice";
import { emailRegex, validationMessages } from "../../utils/constants/Constants";
import { toastSuccess } from "../../utils/functions";
import "./forgotPassword.css";
const logo = "https://account-files-bucket.s3.ap-south-1.amazonaws.com/accounts/assets/images/edexa-blue.svg";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = () => setShowPassword(!showPassword);
	const formik = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().matches(emailRegex, validationMessages.email.invalid).required(validationMessages.email.required),
			password: Yup.string().required(validationMessages.password.required)
		}),
		onSubmit: (value) => {
			dispatch(setLoading(true));
			const { email, password } = value;

			LoginAPI({ email, password }).then((res) => {
				if (res.status === 201) {
					const permission = { ...res.data.admin.permission };
					permission.dashboard = { create: true, delete: true, update: true, view: true };
					dispatch(setLoading(false));
					dispatch(
						onLogIn({
							token: res.data.token,
							permission: { ...permission },
							isLoggedIn: true,
							userData: {
								email: email,
								firstName: res.data.admin.firstName,
								lastName: res.data.admin.lastName,
								profilePic: res.data.admin.profilePic,
								userId: res.data.admin.userId,
								roleId: res.data.admin.roleId
							}
						})
					);
					dispatch(setUserData(res.data.admin));
					dispatch(setPermission({ ...permission }));
					toastSuccess(`${res.data?.admin?.firstName} logged in successfully`);
					navigate("/dashboard");
				}
			});
		}
	});
	const { values, handleBlur, handleChange, handleSubmit, errors, touched } = formik;
	return (
		<div className="container-fluid prevent-select vh-100 login-section">
			<div className="p-4 d-flex h-100 ">
				<div className=" flex-column justify-content-between py-20">
					<div className="d-flex align-items-center"></div>
				</div>
				<div className="rounded-10 m-auto bg-white p-40 login-form">
					<img src={logo} alt="logo" className="my-1 logo" width={160} />
					<div className="login-inner-sec">
						<div className="">
							<h2 className="c-black sub-title mb-0">Login</h2>
							<p className="c-gray"> Login to Check Point Central Admin</p>
							<div className="mt-20">
								<Label className="c-black fw-bold" htmlFor="email">
									Email
								</Label>
								<InputGroup>
									<Input
										type="email"
										placeholder="Email"
										className="p-10"
										name="email"
										id="email"
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										onKeyPress={(e) => {
											e.key.toLowerCase() === "enter" && handleSubmit();
										}}
										invalid={Boolean(touched?.email && errors?.email)}
									/>
									<InputGroupText className={touched?.email && errors?.email ? "input-group-wrapper pass-input" : "input-group-wrapper"}>
										<InputGroupText style={{ border: 0 }}>
											{" "}
											<FontAwesomeIcon icon={faEnvelope} />
										</InputGroupText>
									</InputGroupText>
								</InputGroup>
								{touched?.email && errors?.email && <span className="text-danger">{errors?.email}</span>}
							</div>
							<div className="mt-10">
								<Label className="c-black prevent-select fw-bold" htmlFor="password">
									Password
								</Label>
								<div className={"input-group-wrapper"} style={{ cursor: "pointer" }}>
									<InputGroup>
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Password"
											className="p-10"
											name="password"
											id="password"
											onChange={handleChange}
											onBlur={handleBlur}
											onKeyPress={(e) => {
												e.key.toLowerCase() === "enter" && handleSubmit();
											}}
											invalid={Boolean(touched?.password && errors?.password)}
										/>
										<InputGroupText className={touched?.password && errors?.password ? "input-group-wrapper pass-input" : "input-group-wrapper"} onClick={togglePassword}>
											<InputGroupText style={{ border: 0 }}>{showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</InputGroupText>
										</InputGroupText>
									</InputGroup>
								</div>

								{touched?.password && errors?.password && <span className="text-danger">{errors?.password}</span>}
							</div>
							<div className="mt-20 forgot-password">
								<Link to="/forgot-password" className="mb-0 prevent-select sub-paragraph fw-bold c-green mt-20">
									Forgot Password?
								</Link>
							</div>
							<button type="submit" className="mt-20 w-100 custom-primary prevent-select height-46 fw-bold" onClick={() => handleSubmit()}>
								Login
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
