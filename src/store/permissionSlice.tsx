import { createSlice } from "@reduxjs/toolkit";
import { cookieKeys } from "../utils/constants/Constants";
import { getDecryyptedCookie, setEncryptedCookie } from "../utils/functions";

const initialState = {
	permission: getDecryyptedCookie(cookieKeys.cookiePermission) || {}
};

const permissionSlice = createSlice({
	name: "permissionSlice",
	initialState,
	reducers: {
		setPermission: (state, action) => {
			state.permission = action.payload;
			setEncryptedCookie(cookieKeys.cookiePermission, action.payload);
		}
	}
});
// Action creators are generated for each case reducer function
export const { setPermission } = permissionSlice.actions;

export default permissionSlice.reducer;
