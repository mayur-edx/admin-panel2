import { faCogs, faHome, faTags, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
import { ForgotPassword, Login, ResetPassword } from "../../pages/auth";
import GlobalSettings from "../../pages/globalSettings/GlobalSettings";
import { Home } from "../../pages/home";
import { LabelManagement } from "../../pages/labelManagement";
import { Profile } from "../../pages/profile";
import { RollManagement } from "../../pages/roleManagement";
import RoleForm from "../../pages/roleManagement/RoleForm";
import { UserForm, UserManagement } from "../../pages/userManagement";
import { ModuleName } from "../../utils/constants/Constants";

/* private routing */

export const publicRoutesObj = [
	{
		path: "/login",
		component: <Login />
	},
	{
		path: "/forgot-password",
		component: <ForgotPassword />
	},
	{
		path: "/reset-password/:resetToken",
		component: <ResetPassword />
	},
	{
		path: "/set-password/:resetToken",
		component: <ResetPassword />
	},
	{
		path: "*",
		component: <Navigate to={"/login"} />
	}
];

// side bar array and those component
export const SideBarArray = [
	{
		id: 1,
		label: "Dashboard",
		icon: faHome,
		path: "/dashboard",
		component: <Home />,
		subModule: ModuleName.DASHBOARD
	},
	{
		id: 4,
		label: "Role Management",
		icon: faUserTie,
		path: "/role-management",
		component: <RollManagement />,
		subModule: ModuleName.ROLE_MANAGEMENT
	},
	{
		id: 3,
		label: "User Management",
		icon: faUser,
		path: "/user-management",
		component: <UserManagement />,
		subModule: ModuleName.USER_MANAGEMENT
	},
	{
		id: 2,
		label: "Multilingual Text Manager",
		icon: faTags,
		path: "/multilingual",
		component: <LabelManagement />,
		subModule: ModuleName.LABEL_MANAGEMENT
	},
	{
		id: 5,
		label: "Global Settings",
		icon: faCogs,
		path: "/global-settings",
		component: <GlobalSettings />,
		subModule: ModuleName.GLOBAL_SETTINGS
	}
];

export const privateRoutesObj = [
	{
		path: "/dashboard",
		component: <Home />,
		subModule: ModuleName.DASHBOARD
	},
	{
		path: "/multilingual",
		component: <LabelManagement />,
		subModule: ModuleName.LABEL_MANAGEMENT
	},
	{
		path: "/user-management",
		component: <UserManagement />,
		subModule: ModuleName.USER_MANAGEMENT
	},
	{
		path: "/user-management/create",
		component: <UserForm />,
		subModule: ModuleName.USER_MANAGEMENT
	},
	{
		path: "/user-management/:userId",
		component: <UserForm />,
		subModule: ModuleName.USER_MANAGEMENT
	},
	{
		path: "/role-management",
		component: <RollManagement />,
		subModule: ModuleName.ROLE_MANAGEMENT
	},
	{
		path: "/role-management/create",
		component: <RoleForm />,
		subModule: ModuleName.ROLE_MANAGEMENT
	},
	{
		path: "/role-management/:roleId",
		component: <RoleForm />,
		subModule: ModuleName.ROLE_MANAGEMENT
	},
	{
		path: "/profile",
		component: <Profile />,
		subModule: ModuleName.DASHBOARD
	},
	{
		path: "/global-settings",
		component: <GlobalSettings />,
		subModule: ModuleName.GLOBAL_SETTINGS
	},
	{
		path: "*",
		component: <Navigate to={"/dashboard"} />,
		subModule: ModuleName.DASHBOARD
	}
];
