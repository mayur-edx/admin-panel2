import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import { getUsersAPI } from "../../actions/dashboardAPI/GetUsersAPI";
import useViewRestricted from "../../hooks/restrictions/useViewRestricted";
import { ModuleName } from "../../utils/constants/Constants";
import TitleDashboard from "./TitleDashboard";
import "./home.css";

const Home = () => {
	const { viewRestrictedPermission } = useViewRestricted();
	const navigate = useNavigate();
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const getUsersData = () => {
		setLoading(true);
		getUsersAPI()
			.then((res: any) => {
				if (res.status === 200) {
					setData(res?.data?.userCount);
					setLoading(false);
				}
			})
			.catch(() => setLoading(false));
	};

	useEffect(() => {
		getUsersData();
	}, []);

	const handlePermissionCheck = (subModule: string) => {
		return viewRestrictedPermission(subModule);
	};

	return (
		<div className="holders">
			<p className="main-title mb-10">Dashboard</p>
			<div className="d-flex flex-wrap justify-content-between list-box rounded-10">
				{loading ? (
					<div className="d-flex w-100 justify-content-center align-items-center">
						<span className="fw-600 mr-10">Loading...</span>
						<Spinner size={"sm"} />
					</div>
				) : (
					<TitleDashboard
						title="Total User"
						count={data ? data : 0}
						cursor={`${handlePermissionCheck(ModuleName.USER_MANAGEMENT) ? "pointer" : "default"}`}
						width="32%"
						onClick={() => (handlePermissionCheck(ModuleName.USER_MANAGEMENT) ? navigate("/user-management") : null)}
					/>
				)}
			</div>
		</div>
	);
};

export default Home;
