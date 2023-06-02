export const rowsPerPage = [10, 20, 30, 40, 50];
export const initialPaginationConfig = {
	filter: null,
	search: "",
	limit: 10,
	page: 1
};
export const primaryColor = "#49D798";
export const dateFormat = "DD-MM-YYYY | h:mm A";
export const defaultCountryCode = "ch";
export const toasterPosition = "bottom-left";
export const cookieExpiresInDays = 7;
export const onlyCharacterRegx = /^[a-zA-Z]+$/;
export const defaultUserImg = "https://edexa-portal-beta.s3.ap-south-1.amazonaws.com/users/defaultImg.png";

export const ReactSelectCustomstyle = {
	dropdownIndicator: (base: any) => ({
		...base,
		color: "#4c4f53", // Custom colour
		cursor: "pointer"
	}),
	control: (base: any) => ({
		...base,
		borderColor: "#dadce0 !important",
		minHeight: 50,
		// This line disable the blue border
		boxShadow: "none",
		"&:hover": {
			borderColor: "#dadce0 !important"
		}
	})
};

export const validationMessages = {
	onlyAlphabets: "Please enter aplhabets only",
	onlyNumerical: "Please enter numerical value",
	firstName: {
		required: "First name is required",
		invalid: "Only alphabet are allowed",
		min: "Minimum 2 characters required",
		max: "Maximum 30 characters required"
	},
	lastName: {
		required: "Last name is required",
		invalid: "Only alphabet are allowed",
		min: "Minimum 2 characters required",
		max: "Maximum 30 characters required"
	},
	email: {
		required: "Email is required",
		invalid: "Invalid email"
	},
	password: {
		required: "Password is required",
		matches: "Minimum eight and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
	},
	regFullName: {
		required: "Full Name is required"
	},
	termsConditions: {
		required: "Terms of serive is required"
	},
	formInvalid: "Please fill required fields",
	invalidFile: "Please upload only jpg or png image",
	currentPassword: {
		required: "Current password is required"
	},
	oldPassword: {
		required: "Old password is required"
	},
	newPassword: {
		required: "New password is required",
		notSame: "Old password and new password cannot be same"
	},
	confirmPassword: {
		required: "Confirm new password is required",
		requiredConfirm: "Confirm password is required",
		mustMatch: "New password and confirm new password mismatched",
		mustNewMatch: "New password and confirm password mismatched",
		passwordMatch: "Password and confirm password mismatched"
	},
	onlyCharacters: "Only alphabets are allowed for this field",
	phone: {
		required: "Phone number is required"
	},
	otp: {
		required: "OTP number is required"
	},
	fullname: {
		require: "Full name is required"
	},
	roleName: {
		required: "Role name is required",
		min: "Minimum 2 characters",
		max: "Maximum 30 characters"
	},
	permission: {
		required: "Permission name is required"
	},
	groupName: {
		required: "Group name is required",
		invalid: "Only alphabet are allowed",
		min: "Group Name must be at least 3 characters long",
		max: "Group Name should not exceed 26 characters limit"
	},
	birthDate: { required: "Birth date is required" },
	pollTitle: {
		required: "Poll title is required",
		invalid: "Only alphabet are allowed",
		min: "Poll title must be at least 3 characters long",
		max: "Poll title should not exceed 240 characters limit"
	},
	resultDate: {
		required: "Result date is required"
	},
	voteStartDate: {
		required: "Voting start date is required"
	},
	voteEndDate: {
		required: "Voting end date is required"
	},
	group: {
		required: "At least one group has to be selected",
		labelRequired: "Label is Required",
		valueRequired: "value is Required"
	},
	// Create Template Related messages
	templateName: {
		required: "Template Name is required",
		min: "Minimum 3 characters",
		max: "Maximum 25 characters"
	},
	templateDescription: {
		required: "Description is required",
		min: "Minimum 25 characters",
		max: "Maximum 100 characters"
	},
	title: {
		required: "Title is required"
	},
	placeholder: {
		required: "Placeholder is required"
	},
	key: {
		required: "Key is required"
	},
	default: {
		required: "Default Value is required"
	},
	type: {
		required: "Type Value is required"
	},
	domain: { required: "Domain name is required" },
	region: { required: "Region name is required" },
	file: { required: "Upload File is required" },
	name: { required: "Name is required" },
	appName: { required: "Name is required" },
	imageUrl: { required: "Image  is required" },
	redirectionUrl: { required: "Redirection Url is required" }
};

export const TemplateLimite = 12;

export const paginationKeysObject = {
	page: 1,
	limit: 12,
	search: ""
};

export const extensionLists = {
	video: ["m4v", "avi", "mpg", "mp4", "webm"],
	image: ["jpg", "gif", "bmp", "png"],
	document: ["pdf", "doc", "docx"]
};

export const ToggleMessage = {
	Private: "Please enable to make your NFT Private",
	Public: "Please disable to make your NFT Public"
};

export enum PAYMENT_STATUS {
	PENDING = "pending",
	FAILED = "failed",
	SUCCESS = "success",
	CANCELLED = "cancelled"
}

export const debounceTimeInMilliseconds = 500;

export const onlyCharacterValidationRegex = /^[aA-zZ '\s]+$/;
export const onlyNumberRegex = /^[0-9]*$/;
export const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{1,3}/;
export const onlyCharacterWithLimit = /^[a-zA-z0-9]+([\s][a-zA-Z0-9]+)*$/; //minimum should be 3 and max can be 15 alphabets and numbers are allowed
export const onlyNewpassword =
	// eslint-disable-next-line
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16}$)/;

export const localStorageKeys = {
	isLoggedIN: "isLoggedIN",
	userToken: "userToken",
	cookieToken: "cookieToken",
	deviceId: "deviceId",
	globalSetting: "globalSetting",
	languageType: "languageType"
};

export const cookieKeys = {
	cryptoSecretKey: "checkpointUser",
	cookiePermission: "Permission",
	cookieCurrentModule: "CurrentModule",
	cookieInitial: "checkpoint",
	cookieUser: "CookieUser",
	cookieUserData: "CookieUserData"
};

export enum ModuleName {
	DASHBOARD = "dashboard",
	LABEL_MANAGEMENT = "label_management",
	USER_MANAGEMENT = "admin_management",
	ROLE_MANAGEMENT = "role_management",
	GLOBAL_SETTINGS = "global_management"
}

export const ComingSoonRoute = ["/wallet-management", "/identity-verification", "/fund-transfers", "/trading-management", "/holders"];
