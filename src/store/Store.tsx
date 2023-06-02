import { configureStore } from "@reduxjs/toolkit";
import { IuserData } from "../actions/adminAPI/LoginAPI";
import authSlice from "./authSlice";
import counterSlice from "./counterSlice";
import LoaderSlice from "./LoaderSlice";
import permissionSlice from "./permissionSlice";
import SideBarSlice from "./SideBarSlice";
import userDataSlice from "./userDataSlice";

const store = configureStore<IrootSlice>({
	reducer: {
		counter: counterSlice,
		auth: authSlice,
		sidebarToggle: SideBarSlice,
		loader: LoaderSlice,
		permission: permissionSlice,
		userData: userDataSlice
	}
});

export interface IrootSlice {
	counter: {
		value: number;
	};
	auth: {
		isLoggedIn: any;
	};
	sidebarToggle: {
		isSidebarOpen: boolean;
	};
	loader: {
		isLoading: boolean;
	};
	permission: {
		permission: any;
	};
	userData: {
		user: IuserData;
	};
}

export default store;
