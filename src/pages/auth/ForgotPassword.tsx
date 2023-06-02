import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input, InputGroup, InputGroupText, Label } from "reactstrap";
import * as Yup from "yup";
import { ForgetPasswordAPI } from "../../actions/adminAPI/ForgetPasswordAPI";
import { setLoading } from "../../store";
import { validationMessages } from "../../utils/constants/Constants";
import { toastSuccess } from "../../utils/functions";
import "./forgotPassword.css";
const logo = "https://account-files-bucket.s3.ap-south-1.amazonaws.com/accounts/assets/images/edexa-blue.svg";

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const navigation = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: ""
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().email(validationMessages.email.invalid).required(validationMessages.email.required)
		}),
		onSubmit: (value, methods) => {
			const { email } = value;
			dispatch(setLoading(true));
			ForgetPasswordAPI({ email }).then((res) => {
				if (res.status === 200) {
					navigation("/login");
					toastSuccess(res.message);
					dispatch(setLoading(false));
					methods.resetForm();
				}
			});
		}
	});
	const { values, handleBlur, handleChange, handleSubmit, errors, touched } = formik;

	return (
		<div className="container-fluid vh-100 login-section">
			<div className="p-4 d-flex h-100 ">
				<div className=" flex-column justify-content-between py-20">
					<div className="d-flex align-items-center"></div>{" "}
				</div>{" "}
				<div className="rounded-10 m-auto bg-white p-40 login-form">
					<img src={logo} alt="logo" className="my-4 logo" width={160} />

					<div className="">
						<div className="">
							<h2 className="c-black sub-title mb-0">Forgot Password</h2>
							<p className="c-gray"> Please add your Email Address</p>
							<Label className="mt-20 c-black fw-bold" htmlFor="email">
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

							<button className="mt-20 w-100 custom-primary height-46" onClick={() => handleSubmit()}>
								Forgot Password
							</button>

							<div className="mt-10 forgot-password">
								<Link to="/login" className="mb-0 sub-paragraph c-green mt-20 fw-bold">
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

export default ForgotPassword;
