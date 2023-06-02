import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSidebarOpen: true
};

const SideBarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		toggleSidebar: (state, action) => {
			state.isSidebarOpen = action.payload;
		}
	}
});

// Action creators are generated for each case reducer function
export const { toggleSidebar } = SideBarSlice.actions;

export default SideBarSlice.reducer;
