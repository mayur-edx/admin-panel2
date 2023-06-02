import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import "./permission.css";

const SubPermission = ({ data, name, setData, mainData, moduleName }: any) => {
	const [check, setCheck] = useState(false);
	useEffect(() => {
		let count = 0;
		Object.keys(data).map((key) => {
			if (!data[key]) {
				count = count + 1;
			}
		});
		setCheck(count === 0 ? true : false);
	}, [mainData]);

	const handleClick = (e: any) => {
		const checked = e.target.checked;
		const mainObject = { ...mainData };
		Object.keys(data).map((item) => {
			mainObject[name][item] = checked;
		});
		setData(mainObject);
	};

	const handlePermission = (e: any, key: string) => {
		const checked = e.target.checked;
		setData((state: any) => {
			const mainObject = { ...state };
			if (key === "update" || key === "delete" || key === "create") {
				if (checked) {
					mainObject[name].view = checked;
				}
				mainObject[name][key] = checked;
			}
			if (key === "view") {
				mainObject[name][key] = checked;
				if (!checked) {
					mainObject[name].update = checked;
					mainObject[name].delete = checked;
					mainObject[name].create = checked;
				}
			}
			return mainObject;
		});
	};

	return (
		<div className="col-3 p-3">
			<div className="p-3 rounded-2 border-green" style={{ border: "1px solid" }}>
				<div className="d-flex justify-content-between">
					<h5 className="c-black text-capitalize mb-0">{name ? String(name).replace("_", " ") : ""}</h5>
					<div className="d-flex checkclass">
						<Input type="checkbox" checked={check} name={"d"} id={`${name}${moduleName}`} onChange={handleClick} />
						<label htmlFor={`${name}${moduleName}`} className="color-black2">
							<span className="text-capitalize fw-600 c-black">All</span>
						</label>
					</div>
				</div>
				{Object.keys(data).map((key, index) => (
					<div className="ml-10 mt-10 d-flex checkclass" key={index}>
						<Input type="checkbox" checked={data[key]} name={"d"} id={`${key}${name}${moduleName}`} onChange={(e) => handlePermission(e, key)} />
						<label htmlFor={`${key}${name}${moduleName}`} className="color-black2">
							<span className="text-capitalize fw-600 c-black">{key}</span>
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default SubPermission;
