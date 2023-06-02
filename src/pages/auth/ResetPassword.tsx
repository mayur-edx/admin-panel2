/* eslint-disable @typescript-eslint/ban-ts-comment */
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input, InputGroup, InputGroupText, Label } from "reactstrap";
import * as Yup from "yup";
import { ResetPasswordAPI } from "../../actions/adminAPI/ResetPasswordAPI";
import { setLoading } from "../../store/LoaderSlice";
import { onlyNewpassword, validationMessages } from "../../utils/constants/Constants";
import { toastSuccess } from "../../utils/functions/CommonFunctions";
const logo = "https://account-files-bucket.s3.ap-south-1.amazonaws.com/accounts/assets/images/edexa-blue.svg";

const ResetPassword = () => {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [passwordIcon, setShowPassword] = useState({
		password: false,
		confirmPassword: false
	});
	// @ts-ignore
	const togglePassword = (key: string) => setShowPassword({ ...passwordIcon, [key]: !passwordIcon?.[key] });

	const formik = useFormik({
		initialValues: {
			password: "",
			confirmPassword: ""
		},
		validationSchema: Yup.object().shape({
			password: Yup.string()
				.required(validationMessages.newPassword.required)
				.matches(onlyNewpassword, "Minimum 8 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
			confirmPassword: Yup.string()
				.required(validationMessages.confirmPassword.requiredConfirm)
				.oneOf([Yup.ref("password"), ""], validationMessages.confirmPassword.mustNewMatch)
		}),
		onSubmit: (value) => {
			if (params?.resetToken) {
				const { password } = value;
				dispatch(setLoading(true));
				ResetPasswordAPI({ password, resetToken: params?.resetToken })
					.then((res) => {
						if (res.status === 200) {
							navigate("/login");
							toastSuccess(res.message);
							dispatch(setLoading(false));
						}
					})
					.catch(() => {
						navigate("/login");
					});
			}
		}
	});
	const { handleBlur, handleChange, handleSubmit, errors, touched } = formik;

	return (
		<div className="container-fluid vh-100 login-section">
			<div className="p-4 d-flex h-100 ">
				<div className=" flex-column justify-content-between py-20">
					<div className="d-flex align-items-center"></div>
				</div>
				<div className="rounded-10 m-auto bg-white p-40 login-form">
					<img src={logo} alt="logo" className="my-4 logo" width={160} />
					<div className="login-inner-sec">
						<div className="">
							<h2 className="c-black sub-title mb-0">{location.pathname.includes("reset") ? "Reset" : "Set"} Password</h2>
							<p className="c-gray"> Please Enter Your Password</p>
							<div className="mt-20">
								<Label className="c-black fw-bold" htmlFor="email">
									New Password
								</Label>
								<InputGroup>
									<Input
										type={passwordIcon.password ? "text" : "password"}
										id="password"
										placeholder="New Password"
										className="p-10"
										name="password"
										onChange={handleChange}
										onBlur={handleBlur}
										onKeyPress={(e) => {
											e.key.toLowerCase() === "enter" && handleSubmit();
										}}
										invalid={Boolean(touched?.password && errors?.password)}
									/>
									<InputGroupText className={touched?.password && errors?.password ? "input-group-wrapper pass-input" : "input-group-wrapper"} onClick={() => togglePassword("password")}>
										<InputGroupText style={{ border: 0 }}>{passwordIcon.password ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</InputGroupText>
									</InputGroupText>
								</InputGroup>
								{touched?.password && errors?.password && <span className="text-danger">{errors.password}</span>}
							</div>
							<div className="mt-10">
								<Label className="c-black fw-bold" htmlFor="password">
									Confirm Password
								</Label>
								<InputGroup>
									<Input
										type={passwordIcon.confirmPassword ? "text" : "password"}
										placeholder="Confirm Password"
										className="p-10"
										name="confirmPassword"
										id="confirmPassword"
										onChange={handleChange}
										onBlur={handleBlur}
										onKeyPress={(e) => {
											e.key.toLowerCase() === "enter" && handleSubmit();
										}}
										invalid={Boolean(touched?.confirmPassword && errors?.confirmPassword)}
									/>
									<InputGroupText
										className={touched?.confirmPassword && errors?.confirmPassword ? "input-group-wrapper pass-input" : "input-group-wrapper"}
										onClick={() => togglePassword("confirmPassword")}>
										<InputGroupText style={{ border: 0 }}>{passwordIcon.confirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}</InputGroupText>
									</InputGroupText>
								</InputGroup>
								{touched?.confirmPassword && errors?.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
							</div>
							<button type="submit" className="mt-20 fw-bold w-100 custom-primary height-46" onClick={() => handleSubmit()}>
								{location.pathname.includes("reset") ? "Reset" : "Set"} Password
							</button>
							<div className="mt-10 forgot-password">
								<Link to="/login" className="mb-0 fw-bold sub-paragraph c-green mt-20">
									Back to Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
