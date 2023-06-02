import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { LogoutAPI } from "../../../actions/adminAPI/LogoutAPI";
import CustomTooltip from "../../../components/tooltip/ToolTip";
import { onLogOut, setLoading, toggleSidebar } from "../../../store";
import { IrootSlice } from "../../../store/Store";
import { setPermission } from "../../../store/permissionSlice";
import { defaultUserImg } from "../../../utils/constants/Constants";
import { toastSuccess } from "../../../utils/functions/CommonFunctions";
import "./header.css";
const logo = "https://account-files-bucket.s3.ap-south-1.amazonaws.com/accounts/assets/images/edexa-blue.svg";
const Logo = defaultUserImg;

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userData = useSelector((state: IrootSlice) => state.userData.user);

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen((prevState) => !prevState);

	const handleLogout = () => {
		dispatch(setLoading(true));
		LogoutAPI().then((res) => {
			if (res.status === 200) {
				dispatch(setPermission({}));
				dispatch(onLogOut());
				localStorage.clear();
				dispatch(setLoading(false));
			}
		});
	};
	const { isSidebarOpen } = useSelector((state: IrootSlice) => state.sidebarToggle);

	const handleSidebarToggle = () => {
		dispatch(toggleSidebar(!isSidebarOpen));
	};

	return (
		<div className="d-flex justify-content-between align-items-center w-100 header">
			<div className="d-flex align-items-center justify-content-center">
				<img src={logo} className="mr-10 cursor-pointer" onClick={() => navigate("/dashboard")} alt="logo" width={120} />
				<div className="sidebar-toggle" onClick={handleSidebarToggle}>
					<FontAwesomeIcon icon={faBars} className="mb-0 c-green" />
				</div>
			</div>
			<div className="d-flex justify-content-center align-items-center">
				<Dropdown className="d-flex align-items-center justify-content-center" onClick={() => toastSuccess("Coming Soon")}>
					<DropdownToggle className="menu-button">
						<CustomTooltip direction="bottom" content="Notification">
							<FontAwesomeIcon className="font-20 c-green mt-1 bell-icon" icon={faBell} />
						</CustomTooltip>
					</DropdownToggle>
					<DropdownMenu className="rounded-10 profile-list">
						<></>
					</DropdownMenu>
				</Dropdown>

				<Dropdown isOpen={dropdownOpen} toggle={toggle}>
					<CustomTooltip direction="bottom" content="Profile">
						<DropdownToggle
							className="menu-profile"
							style={{ backgroundImage: `url(${userData?.profilePic ? userData?.profilePic : Logo})`, backgroundSize: "cover", width: "40px", height: "40px" }}></DropdownToggle>
					</CustomTooltip>
					<DropdownMenu className="rounded-10 profile-list">
						<div className="p-10">
							<p className="font-12  c-black bg-lightOrange text-center profile-title rounded-2">
								This account is managed by Check Point.
								<Link to="#" className="fw-600 c-green" onClick={() => toastSuccess("Coming Soon")}>
									{" "}
									Learn more
								</Link>
							</p>
							<div className="d-flex flex-column mt-1 text-truncate align-items-center gap-2 overflow-hidden w-100">
								<img
									src={userData?.profilePic ? userData?.profilePic : Logo}
									alt="profile"
									style={{
										objectFit: "cover",
										borderRadius: "50%",
										height: "80px",
										width: "80px"
									}}
								/>
								<p className="color-black1 text-center font-16 w-100 fw-bold text-truncate">
									{userData?.firstName ? userData?.firstName : userData?.email?.split("@")[0]} {userData?.lastName}
								</p>
								<p className="color-black1 w-100 text-center font-14 fw-bold text-truncate">{userData?.email}</p>
								<button
									className="custom-primary w-100"
									onClick={() => {
										toggle();
										navigate("/profile");
									}}>
									Manage your profile
								</button>
							</div>
						</div>
						<div className="profile-footer w-100 mt-10">
							<div className="logout p-2">
								<button className="custom-primary-outline w-100" onClick={handleLogout}>
									Logout
								</button>
							</div>
							<div className="d-flex justify-content-center align-items-center policy">
								<Link to="#" className="font-12 c-green" onClick={() => toastSuccess("Coming Soon")}>
									Privacy Policy -{" "}
								</Link>
								<Link to="#" className="font-12 c-green" onClick={() => toastSuccess("Coming Soon")}>
									Terms of Service
								</Link>
							</div>
						</div>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
};

export default Header;
