/* eslint-disable no-debugger */
import { createSlice } from "@reduxjs/toolkit";
import { cookieKeys } from "../utils/constants/Constants";
import { getDecryyptedCookie, handleLogout, setEncryptedCookie } from "../utils/functions/CommonFunctions";

const handleLoginCheck = () => {
	const userData = getDecryyptedCookie(cookieKeys?.cookieUser);
	if (userData) {
		if (userData?.isLoggedIn) {
			if (userData?.token && userData?.permission && userData?.userData?.email) {
				return true;
			}
		}
	}
	handleLogout();
	return false;
};

const initialState = {
	isLoggedIn: handleLoginCheck()
};
// dsd
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		onLogIn: (state, actions) => {
			state.isLoggedIn = true;
			setEncryptedCookie(cookieKeys.cookieUser, actions.payload);
		},
		onLogOut: (state) => {
			handleLogout();
			state.isLoggedIn = false;
		}
	}
});

// Action creators are generated for each case reducer function
export const { onLogIn, onLogOut } = authSlice.actions;

export default authSlice.reducer;
