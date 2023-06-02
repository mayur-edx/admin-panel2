/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, FormFeedback, FormGroup, Input, Row, Spinner } from "reactstrap";
import * as Yup from "yup";
import { GetPorfileAPI, IGetPorfileAPIData } from "../../../actions/adminAPI/GetPorfileAPI";
import { UpdateProfileAPI } from "../../../actions/adminAPI/UpdateProfileAPI";
import { setLoading } from "../../../store";
import { setUserData } from "../../../store/userDataSlice";
import { cookieKeys, defaultUserImg, onlyCharacterValidationRegex, validationMessages } from "../../../utils/constants/Constants";
import { getDecryyptedCookie, toastSuccess } from "../../../utils/functions";
import ColumnComponent from "../ColumanComponent";
import ReadComponent from "../ReadComponent";

const UpdateProfile = () => {
	const dispatch = useDispatch();
	const [linkOpen, setLinkOpen] = useState(false);
	const [disable, setDisable] = useState(true);
	const [loading, setIsLoading] = useState(true);
	const [data, setData] = useState<IGetPorfileAPIData>();
	const [profile, setProfile] = useState({
		img: defaultUserImg,
		error: false,
		loading: true
	});

	const profileFormik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			profilePic: ""
		},
		validationSchema: Yup.object().shape({
			firstName: Yup.string()
				.required(validationMessages.firstName.required)
				.min(3, "First Name must be at least 3 characters long")
				.max(90, "First Name should not exceed 90 characters limit")
				.matches(onlyCharacterValidationRegex, validationMessages.firstName.invalid),
			lastName: Yup.string()
				.required(validationMessages.lastName.required)
				.min(3, "Last Name must be at least 3 characters long")
				.max(90, "Last Name should not exceed 90 characters limit")
				.matches(onlyCharacterValidationRegex, validationMessages.lastName.invalid)
		}),
		onSubmit: (value) => {
			dispatch(setLoading(true));
			const fromData = new FormData();
			Object.keys(value).map((key: string) => {
				// @ts-ignore
				if (data[key] !== value[key]) {
					// @ts-ignore
					if (typeof value[key] === "string") {
						// @ts-ignore
						fromData.append(key, value[key].trim());
					} else {
						// @ts-ignore
						fromData.append(key, value[key]);
					}
				}
			});
			UpdateProfileAPI(fromData).then((res) => {
				if (res.status === 200) {
					getProfileAction();
					setLinkOpen(!linkOpen);
					toastSuccess(res.message);
					dispatch(setLoading(false));
				}
			});
		}
	});
	const { errors, values, handleBlur, touched, setFieldValue, handleSubmit } = profileFormik;
	const getProfileAction = () => {
		GetPorfileAPI()
			.then((res) => {
				if (res.status === 200) {
					setData(res.data);
					setFieldValue("firstName", res.data.firstName);
					setFieldValue("lastName", res.data.lastName);
					setFieldValue("profilePic", res.data.profilePic);
					setProfile({ error: false, loading: false, img: res.data.profilePic });
					setIsLoading(false);

					const tempData = getDecryyptedCookie(cookieKeys.cookieUserData);
					const newData = { ...tempData };
					newData.firstName = res.data.firstName;
					newData.lastName = res.data.lastName;
					newData.profilePic = res.data.profilePic;

					dispatch(setUserData(newData));
				}
			})
			.catch(() => setIsLoading(false));
	};

	useEffect(() => {
		getProfileAction();
	}, []);

	useEffect(() => {
		if (data) {
			Object.keys(values).map((key: string) => {
				// @ts-ignore
				if (data?.[key] !== values?.[key]) {
					setDisable(false);
				}
			});
		}
	}, [data, values]);

	return (
		<Row className="mt-10">
			<Col sm="12" lg="12">
				<div className="kyc-box rounded-10">
					<div className="p-20 d-flex align-items-start justify-content-between flex-wrap info-title">
						<div>
							<h4 className="mb-0 c-black fw-600">Profile</h4>
						</div>
						{linkOpen ? (
							<div className="d-inline-flex">
								<Link to="#" className="font-14 blue fw-bold" onClick={() => setLinkOpen(false)}>
									Cancel
								</Link>
								<span className="font-14  ml-10 mr-10 blue fw-bold">|</span>
								<Link to="#" className={`font-14 blue fw-bold ${disable ? "disable" : ""}`} onClick={() => handleSubmit()}>
									Save
								</Link>
							</div>
						) : (
							<Link to="#" className="font-14 blue fw-bold" onClick={() => setLinkOpen(true)}>
								Edit Profile Info
							</Link>
						)}
					</div>

					{loading ? (
						<>
							<hr className="m-0" />
							<div className="d-flex p-3 justify-content-center align-items-center">
								<span className="color-black1 fw-bold mr-10">Loading...</span>
								<Spinner size={"sm"} />
							</div>
						</>
					) : !linkOpen ? (
						<>
							<ReadComponent title="First Name" value={values.firstName} color={undefined} />
							<ReadComponent title="Last Name" value={values.lastName} color={undefined} />
						</>
					) : (
						<>
							<hr className="m-0" />
							<div className="d-flex align-items-center info-field bg-white p-20">
								<FormGroup className="d-flex align-items-center w-100 switch-margin-0">
									<div className="info-name">
										<p className="font-12 color-black2 fw-normal text-upper">
											First Name
											<span className="text-danger fw-900">*</span>
										</p>
									</div>
									<Input
										type="text"
										className="color-black2 font-16 fw-bold b-none p-0 info-text"
										style={{
											outline: "none",
											border: "none",
											boxShadow: "none"
										}}
										onChange={(e) => {
											if (e.target.value.trim()) {
												setFieldValue("firstName", e.target.value);
											} else {
												setFieldValue("firstName", e.target.value.trim());
											}
										}}
										onBlur={handleBlur}
										name="firstName"
										value={values.firstName}
										invalid={Boolean(touched?.firstName && errors?.firstName)}
									/>
									<FormFeedback invalid>{touched?.firstName && errors?.firstName}</FormFeedback>
								</FormGroup>
							</div>
							<hr className="m-0" />
							<div className="d-flex align-items-center info-field bg-white p-20">
								<FormGroup className="d-flex align-items-center w-100 switch-margin-0">
									<div className="info-name">
										<p className="font-12 color-black2 fw-normal text-upper">
											Last Name
											<span className="text-danger fw-900 font-16 ml-3">*</span>
										</p>
									</div>
									<Input
										type="text"
										className="color-black2 font-16 fw-bold b-none p-0 info-text"
										style={{
											outline: "none",
											border: "none",
											boxShadow: "none"
										}}
										onChange={(e) => {
											if (e.target.value.trim()) {
												setFieldValue("lastName", e.target.value);
											} else {
												setFieldValue("lastName", e.target.value.trim());
											}
										}}
										onBlur={handleBlur}
										name="lastName"
										value={values.lastName}
										invalid={Boolean(touched?.lastName && errors?.lastName)}
									/>
									<FormFeedback invalid>{touched?.lastName && errors?.lastName}</FormFeedback>
								</FormGroup>
							</div>
						</>
					)}
					{loading ? null : (
						<>
							<ReadComponent title="My Role" value={data?.adminRole?.roleName} color={undefined} />
							<ColumnComponent linkOpen={linkOpen} profile={profile} setProfile={setProfile} setProfileImage={setFieldValue} />
						</>
					)}
				</div>
			</Col>
		</Row>
	);
};

export default UpdateProfile;
