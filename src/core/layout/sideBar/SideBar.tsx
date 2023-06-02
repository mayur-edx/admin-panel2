import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as Link, useLocation } from "react-router-dom";
import { ViewRestricted } from "../../../components/restrictions";
import { toggleSidebar } from "../../../store";
import { IrootSlice } from "../../../store/Store";
import { ComingSoonRoute } from "../../../utils/constants/Constants";
import { toastSuccess } from "../../../utils/functions";
import { SideBarArray } from "../../routes/Router";
import "./sidebar.css";

const SidebarComponent = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { isSidebarOpen } = useSelector((state: IrootSlice) => state.sidebarToggle);

	const handleSidebarToggle = () => {
		dispatch(toggleSidebar(!isSidebarOpen));
	};

	const handleComming = (path: string) => {
		ComingSoonRoute.includes(path) ? toastSuccess("Coming soon") : null;
	};

	const handleDemo = (path: string) => {
		return ComingSoonRoute.includes(path);
	};

	return (
		<div className={`sidebar transiton-02s  ${isSidebarOpen ? "show " : "hide d-flex justify-content-center"} `}>
			<div className="sidebar-bg-layer d-xl-none d-block" onClick={handleSidebarToggle}></div>
			<div className="sidebar-main">
				{SideBarArray.map((data) => (
					<ViewRestricted key={data.id} subModule={data?.subModule}>
						<Link
							onClick={() => handleComming(data?.path)}
							className={`sidebar-menu c-black  active-color-white d-flex flex-wrap align-items-center position-relative ${location.pathname.includes(data.path) ? "menu-active" : ""}`}
							to={handleDemo(data?.path) ? "#" : data.path}>
							<FontAwesomeIcon icon={data.icon} />
							{isSidebarOpen && <span className="ml-10">{data.label}</span>}
						</Link>
					</ViewRestricted>
				))}
			</div>
		</div>
	);
};

export default SidebarComponent;
