import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { FormFeedback, FormGroup, Input, InputGroupText } from "reactstrap";

interface IPasswordComponent {
	title: string;
	count: number | string;
	name?: any;
	passwordFormik?: any;
	clear?: undefined;
}
const PasswordComponent: FC<IPasswordComponent> = ({ title, passwordFormik, name, clear }) => {
	const { handleChange, errors, touched } = passwordFormik;

	const [eye, seteye] = useState(false);

	useEffect(() => {
		if (clear === "true") {
			seteye(false);
		}
	}, [clear]);

	return (
		<>
			<hr className="m-0" />
			<div className="d-flex align-items-center info-field flex-wrap p-20">
				<FormGroup className="d-flex align-items-center w-100 switch-margin-0">
					<div className="info-name">
						<p className="font-12 color-black2 fw-normal text-upper">{title}</p>
					</div>
					<Input
						type={`${eye ? "text" : "password"}`}
						name={name}
						placeholder={`Enter Your ${title}`}
						autoFocus={name === "currentPassword"}
						autoComplete={String(false)}
						className="color-black2 font-16 b-none p-0 info-text"
						style={{ outline: "none", border: "none", boxShadow: "none" }}
						onChange={handleChange}
						invalid={Boolean(touched[name] && errors[name])}
					/>
					<FormFeedback invalid>{touched[name] && errors[name]}</FormFeedback>
					<InputGroupText className="h-100 bg-transparent d-flex justify-content-center cursor-pointer" onClick={() => seteye(!eye)} style={{ background: "red" }}>
						{eye ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}{" "}
					</InputGroupText>
				</FormGroup>
			</div>
		</>
	);
};

export default PasswordComponent;
