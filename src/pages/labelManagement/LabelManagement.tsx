/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Spinner } from "reactstrap";
import * as Yup from "yup";
import { addLabelAPI } from "../../actions/LabelAPI/AddLabelAPI";
import { IGetLabelObject, getLabelAPI } from "../../actions/LabelAPI/GetLabelAPI";
import { updateLabelAPI } from "../../actions/LabelAPI/UpdateLabelAPI";
import ConfirmationModal from "../../components/ConfirmationModal";
import { CreateRestricted, EditRestricted } from "../../components/restrictions";
import { useDebouncedEffect } from "../../hooks";
import { setLoading } from "../../store";
import "../../styles/label.css";
import { ModuleName, debounceTimeInMilliseconds, validationMessages } from "../../utils/constants/Constants";
import { toastSuccess } from "../../utils/functions";
import LabelComponent from "./components/LabelComponent";

const LabelManagement = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");
	const [addLabel, setAddLabel] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [noDataFound, setNoDataFound] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
	const [labelResponse, setLabelResponse] = useState<IGetLabelObject>();
	const [addSearchInNewState, setAddSearchInNewState] = useState([""]);
	const [noDataFoundCondition, setNoDataFoundCondition] = useState(false);
	const [isOpen, setIsopen] = useState<any>({
		open: false,
		label: "",
		key: "",
		checked: false
	});
	const [data, setData] = useState({
		key: "",
		english: "",
		german: ""
	});

	// api changes
	const formik = useFormik({
		initialValues: {
			language: "EN",
			DE: {},
			EN: {},
			disable: "true",
			_id: ""
		},
		validationSchema: Yup.object().shape({
			DE: Yup.object().required(validationMessages.firstName.required),
			EN: Yup.object().required(validationMessages.firstName.required)
		}),
		onSubmit: (values: any) => {
			dispatch(setLoading(true));
			const paramater: any = {};
			paramater.EN = values.EN;
			paramater.DE = values.DE;
			setSaveBtnDisabled(true);
			updateLabelAPI(paramater).then((res: any) => {
				if (res?.status === 200) {
					toastSuccess(res?.message);
					// @ts-ignore
					setLabelResponse({ ...labelResponse, DE: values.DE, EN: values.EN });
					handleToggle();
				}
				dispatch(setLoading(false));
			});
		}
	});

	const { values, setFieldValue } = formik;
	const getLabelAction = () => {
		setIsLoading(true);
		getLabelAPI().then((res: any) => {
			if (res?.status === 200) {
				setLabelResponse(res?.data?.labels);
				setFieldValue("_id", res?.data?.id);
				setFieldValue("EN", res?.data?.labels?.EN || {});
				setFieldValue("DE", res?.data?.labels?.DE || {});
			}
			setIsLoading(false);
		});
	};

	useEffect(() => {
		getLabelAction();
	}, []);

	useEffect(() => {
		// eslint-disable-next-line
		let filteredValue = Object.keys(values.EN || values.DE).filter((key: any) => {
			if (search === "") {
				return key;
			} else if (key.toLowerCase().includes(search.toLowerCase())) {
				return key;
			}
		});
		setAddSearchInNewState(filteredValue);
		if (search) {
			setNoDataFoundCondition(true);
		}
		// eslint-disable-next-line
	}, [search]);

	useEffect(() => {
		if (noDataFoundCondition) {
			if (addSearchInNewState.length === 0) {
				setNoDataFound(true);
			} else if (addSearchInNewState.length > 0) {
				setNoDataFound(false);
			}
		}
	}, [addSearchInNewState, noDataFoundCondition]);

	useDebouncedEffect(
		() => {
			//@ts-ignore
			const kay = document.getElementById(search ? search : document.getElementById("label-div")?.firstChild?.id);
			if (kay) {
				kay.scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
				kay.focus();
			}
		},
		debounceTimeInMilliseconds,
		[search]
	);

	const handleChange = (e: any) => {
		if (e.target.value.trim()) {
			setData({ ...data, [e.target.name]: e.target.value });
		} else {
			//@ts-ignore
			if (data[e.target.name] !== "") {
				setData({ ...data, [e.target.name]: "" });
			}
		}
	};

	const handleAddLabel = () => {
		dispatch(setLoading(true));
		const parameter: any = {
			EN: {},
			DE: {}
		};
		parameter.EN = values.EN;
		parameter.DE = values.DE;
		parameter.EN[(data?.key).toLowerCase()] = data?.english;
		parameter.DE[(data?.key).toLowerCase()] = data?.german;
		addLabelAPI(parameter).then(() => {
			setAddLabel(!addLabel);
			dispatch(setLoading(false));
			setData({ key: "", english: "", german: "" });
		});
	};

	const handleKeyDown = (e: any) => {
		if (e.key === " ") {
			e.preventDefault();
		}
	};
	useEffect(() => {
		if (data?.key && data?.english && data?.german) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [data?.key, data?.english, data?.german]);
	const handleToggle = () => {
		setIsopen({
			open: false,
			label: "",
			key: "",
			checked: false
		});
	};

	const handleDelete = () => {
		setIsopen({ open: true, label: "Are you sure you want to update the label?", checked: "", key: "" });
	};
	const handleLabelDeleteConfirmation = (valueKey: string) => {
		setIsopen({ open: true, label: `Are you sure you want to delete the '${valueKey}' label?`, checked: "", key: valueKey });
	};

	const handleLabelDelete = (valueKey: string) => {
		dispatch(setLoading(true));
		const DE = { ...values.DE };
		const EN = { ...values.EN };
		// @ts-ignore
		delete DE[valueKey];
		// @ts-ignore
		delete EN[valueKey];
		setSaveBtnDisabled(true);
		updateLabelAPI({ EN, DE })
			.then((res: any) => {
				if (res?.status === 200) {
					setFieldValue("DE", DE);
					setFieldValue("EN", EN);
					toastSuccess(res?.message);
					// @ts-ignore
					setLabelResponse({ ...labelResponse, DE: values.DE, EN: values.EN });
					handleToggle();
				}
				dispatch(setLoading(false));
			})
			.catch(() => handleToggle());
	};

	return (
		<>
			<div className="holders">
				<h2 className="c-black fw-600">Multilingual Text Manager</h2>
				<div className="bg-white mt-10 rounded-1 p-20">
					<div className="d-flex flex-wrap justify-content-between">
						<div className="d-flex flex-wrap">
							<Input
								type="text"
								placeholder="Search By Label Key"
								className="w-250px"
								onChange={(e) => {
									if (e.target.value.trim()) {
										setSearch(e.target.value);
									} else {
										if (search !== "") {
											setSearch("");
										}
									}
								}}
								value={search}
							/>
							<button className="custom-primary-outline ml-20" onClick={() => setSearch("")}>
								Clear
							</button>
						</div>
						<CreateRestricted subModule={ModuleName.LABEL_MANAGEMENT}>
							<button
								type="button"
								disabled={Boolean(false)}
								className="custom-primary"
								onClick={() => {
									setAddLabel(!addLabel);
								}}>
								Add Label
							</button>
						</CreateRestricted>
						{addLabel && (
							<>
								<div className="col-12 mt-10 mb-10" id="label-div">
									<div className="row">
										<div className="col-4">
											<Input type="text" placeholder="Label Key" name="key" value={data?.key} onChange={handleChange} onKeyDown={handleKeyDown} />
										</div>
										<div className="col-4">
											<Input type="text" placeholder="English Label" name="english" value={data?.english} onChange={handleChange} />
										</div>
										<div className="col-4">
											<Input type="text" placeholder="German Label" name="german" value={data?.german} onChange={handleChange} />
										</div>
									</div>
									<div className="col-12 mt-10 mb-10">
										<button
											type="button"
											className="custom-primary"
											disabled={isDisabled}
											onClick={() => {
												handleAddLabel();
											}}>
											Save
										</button>
										<button
											type="button"
											disabled={Boolean(false)}
											className="custom-primary-outline ml-20"
											onClick={() => {
												setData({ key: "", english: "", german: "" });
												setAddLabel(!addLabel);
											}}>
											Remove
										</button>
									</div>
								</div>
							</>
						)}
					</div>
					<div className="col-12 mt-3">
						<div className="row ">
							<div className="col-4 fw-bold">Label key</div>
							<div className="col-4 fw-bold">English value</div>
							<div className="col-4 fw-bold">German value</div>
						</div>
						<div className="nft-label-section mt-10">
							{isLoading ? (
								<div className="d-flex justify-content-center w-100 align-items-center">
									<span className="mr-10 fw-bold c-black">Loading...</span>
									<Spinner size={"sm"} />
								</div>
							) : (
								values?.DE &&
								(search ? addSearchInNewState : Object.keys(values.DE)).sort().map(function (key, index) {
									return (
										<LabelComponent
											handleLabelDelete={handleLabelDeleteConfirmation}
											key={index}
											valueKey={key}
											setFieldValue={setFieldValue}
											setSaveBtnDisabled={setSaveBtnDisabled}
											values={values}
										/>
									);
								})
							)}

							{noDataFound ? (
								<p
									style={{
										textAlign: "center",
										marginTop: "3%",
										color: "hsl(0deg 0% 80%)"
									}}>
									No Data Found
								</p>
							) : null}
						</div>
						<EditRestricted subModule={ModuleName.LABEL_MANAGEMENT}>
							<div className="col-12 mt-10 mb-10">
								<button type="button" className="custom-primary" onClick={() => handleDelete()}>
									Save
								</button>
							</div>
						</EditRestricted>
					</div>
				</div>
				<ConfirmationModal
					isOpen={isOpen}
					toggle={handleToggle}
					handleAction={(key) => {
						key ? handleLabelDelete(key) : formik.handleSubmit();
					}}
				/>
			</div>
		</>
	);
};

export default LabelManagement;
