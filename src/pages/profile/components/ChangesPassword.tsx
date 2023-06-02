import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import * as Yup from "yup";
import { ChangePasswordAPI } from "../../../actions/adminAPI/ChangePasswordAPI";
import { onLogOut, setLoading } from "../../../store";
import { validationMessages } from "../../../utils/constants/Constants";
import { toastSuccess } from "../../../utils/functions";
import PasswordComponent from "../PasswordComponent";

const ChangesPassword = () => {
	const dispatch = useDispatch();
	const [passwordModal, setPasswordModal] = useState(false);
	const passwordFormik = useFormik({
		initialValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: ""
		},
		validationSchema: Yup.object().shape({
			oldPassword: Yup.string().required(validationMessages.oldPassword.required),
			newPassword: Yup.string()
				.required(validationMessages.newPassword.required)
				.notOneOf([Yup.ref("oldPassword")], validationMessages.newPassword.notSame),
			confirmPassword: Yup.string()
				.required(validationMessages.confirmPassword.required)
				.oneOf([Yup.ref("newPassword")], validationMessages.confirmPassword.mustMatch)
		}),
		onSubmit: (value) => {
			dispatch(setLoading(true));
			ChangePasswordAPI(value).then((res) => {
				if (res.status === 200) {
					dispatch(onLogOut());
					toastSuccess(res.message);
					dispatch(setLoading(false));
				}
			});
		}
	});

	return (
		<Row className="mt-30">
			<Col sm="12" lg="12">
				<div className="kyc-box rounded-10">
					<div className="p-20 d-flex align-items-start justify-content-between flex-wrap info-title">
						<h4 className="mb-0 c-black fw-600">Change Password</h4>
						{passwordModal ? (
							<div className="d-inline-flex">
								<Link to="#" className="font-14 blue fw-bold" onClick={() => setPasswordModal(false)}>
									Cancel
								</Link>
								<span className="font-14 blue fw-bold ml-10 mr-10">|</span>
								<Link to="#" className="font-14 blue fw-bold" onClick={() => passwordFormik.handleSubmit()}>
									Save
								</Link>
							</div>
						) : (
							<div className="d-inline-flex">
								<Link to="#" className="font-14 blue fw-bold" onClick={() => setPasswordModal(true)}>
									Change Password
								</Link>
							</div>
						)}
					</div>
					{passwordModal ? (
						<>
							<PasswordComponent title="Old Password" passwordFormik={passwordFormik} name="oldPassword" clear={undefined} count={""} />
							<PasswordComponent title="New Password" passwordFormik={passwordFormik} name="newPassword" clear={undefined} count={""} />
							<PasswordComponent title="Confirm New Password" passwordFormik={passwordFormik} name="confirmPassword" clear={undefined} count={""} />
						</>
					) : null}
				</div>
			</Col>
		</Row>
	);
};

export default ChangesPassword;
