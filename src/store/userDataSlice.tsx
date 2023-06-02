/* eslint-disable no-debugger */
import { createSlice } from "@reduxjs/toolkit";
import { cookieKeys } from "../utils/constants/Constants";
import { getDecryyptedCookie, setEncryptedCookie } from "../utils/functions/CommonFunctions";

const initialState = {
	user: getDecryyptedCookie(cookieKeys.cookieUserData) || {}
};
const userDataSlice = createSlice({
	name: "userDataSlice",
	initialState,
	reducers: {
		setUserData: (state, actions) => {
			state.user = { ...actions.payload };
			setEncryptedCookie(cookieKeys.cookieUserData, actions.payload);
		}
	}
});

// Action creators are generated for each case reducer function
export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
