export const API_END_POINTS = {
	ADMIN: {
		LOGIN: "login",
		GET_PROFILE: "profile",
		UPDATE_PROFILE: "profile",
		CHANGE_PASSWORD: "change-password",
		LOGOUT: "logout",
		FORGET_PASSWORD: "forget-password",
		RESET_PASSWORD: "reset-password"
	},
	GLOBAL_SETTINGS: {
		GET_GLOBAL_SETTINGS: "settings",
		UPDATE_GLOBAL_SETTINGS: "settings"
	},
	DASHBOARD: {
		GET_USER: "dashboard"
	},
	LABEL_SETTINGS: {
		CREATE_LABEL: "labels",
		GET_LABEL: "labels",
		UPDATE_LABEL: "labels"
	},
	APP_MODULES: {
		CREATE_APP_MODULES: "app-modules",
		GET_APP_MODULES: "app-modules",
		GET_BY_APP_MODULES: "app-modules/",
		UPDATE_APP_MODULES: "app-modules"
	},
	ROLE: {
		CREATE_ROLE: "role",
		GET_ROLE: "role",
		GET_BY_ROLE: "role/",
		UPDATE_ROLE: "role/",
		DELETE_ROLE: "role/",
		GET_PERMISSION: "role/permissions"
	},
	USER: {
		CREATE_USER: "user",
		GET_USER: "user",
		GET_BY_USER: "user/",
		DELETE_USER: "user/",
		UPDATE_USER: "user/"
	}
};
