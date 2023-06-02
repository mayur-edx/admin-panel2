import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false
};

const LoaderSlice = createSlice({
	name: "loader",
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		}
	}
});

// Action creators are generated for each case reducer function
export const { setLoading } = LoaderSlice.actions;

export default LoaderSlice.reducer;
