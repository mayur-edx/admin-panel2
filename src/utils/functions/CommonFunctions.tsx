import { AES, enc } from "crypto-js";
import moment from "moment";
import { toast } from "react-hot-toast";
import { cookieExpiresInDays, cookieKeys, dateFormat, primaryColor, toasterPosition } from "../constants/Constants";

export const toastSuccess = (message: string) => {
	toast.remove();
	toast.success(message, {
		position: toasterPosition,
		className: "toast-success",
		style: {
			color: "#000",
			minWidth: 150,
			padding: 10,
			fontWeight: 500,
			marginBottom: 60,
			border: `1px solid ${primaryColor}`
		},
		iconTheme: { primary: primaryColor, secondary: "#fff" }
	});
};

export const toastError = (message: string) => {
	toast.remove();
	toast.error(message, {
		position: toasterPosition,
		style: {
			color: "#000",
			fontWeight: 500,
			padding: 10,
			marginBottom: 60,
			border: "1px solid #ff0000"
		}
	});
};

/**
 * This function will take a file as input and returns its base64 version string.
 *
 * @param {File} file the file which need to be converted to base64
 * @returns {string} `base64 string`
 *
 * @isTestWrittenForThisFunction `true`
 */
export const getBase64 = (file: File) => {
	if (file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function () {
				return resolve(reader.result);
			};
			reader.onerror = function () {
				reject(false);
			};
		});
	} else {
		return new Promise((resolve) => resolve(""));
	}
};

/**
 * If file size is greater than the second argument then it returns false
 *
 * @param {File} file the original file which need to be validated agains the second param
 * @param {number} size the size for which the input file has to be validated
 * @returns {boolean} true | false
 * @example
 * Call validateFileSize(event.target.files[0], 1024)
 *  if file size is equal to 1kb then returns `true`
 *  else returns `false`
 *
 * @isTestWrittenForThisFunction `true`
 */
export const validateFileSize = (file: File, size: number) => {
	// file will be the file boject
	if (file?.size > size) {
		return false;
	} else {
		return true;
	}
};

/**
 * This function will set the encrypted data to sessionStorage.
 *
 * @param {string} key  name of the item to be set in sessionStorage
 * @param {string} data data to be set in sessionStorage
 *
 * @isTestWrittenForThisFunction `true`
 */
export const setEncryptedSessionStorage = <T extends string | object | boolean | Array<string> | Array<{ [key: string]: string | object }>>(key: string, data: T) => {
	if (data && key) {
		const encryptedString = encryptData(data);
		const keyName = cookieKeys.cookieInitial + "-" + key.trim();
		window.sessionStorage.setItem(keyName, encryptedString.toString());
	}
};

/**
 * This function will get the item from the browser local storage decrypt it and then returns it.
 *
 * @param {string} key - name of the sessionStorage item key
 * @returns {string} value of the input key
 *
 * @isTestWrittenForThisFunction `true`
 */
export const getDecryptedSessionStorage = (key: string) => {
	if (key) {
		const keyName = cookieKeys.cookieInitial + "-" + key.trim();
		const sessionStorageData = window.sessionStorage.getItem(keyName);
		if (sessionStorageData) {
			return decryptData(sessionStorageData);
		} else {
			const cookieUser = getDecryyptedCookie(cookieKeys.cookieUser);
			if (!cookieUser) {
				removedCookie(cookieKeys.cookieUser);
			}
		}
	}
};

/**
 * This function accepts any input type and returns an encrypted string.
 *
 * @param {any} data
 * @returns {string}
 *
 * @isTestWrittenForThisFunction `true`
 */
export const encryptData = <T extends string | object | boolean | Array<string> | Array<{ [key: string]: string | object }>>(data: T) => {
	return AES.encrypt(JSON.stringify(data), cookieKeys.cryptoSecretKey);
};

/**
 * This function wil decrypt an encrypted string {the encrypted string suppose to be an object}
 *
 * @param {string} data
 * @returns {json | string}
 *
 * @isTestWrittenForThisFunction `true`
 */
export const decryptData = (data: string) => {
	const bytes = AES.decrypt(data.toString(), cookieKeys.cryptoSecretKey);
	if (bytes.toString()) {
		return JSON.parse(bytes.toString(enc.Utf8));
	}
	return "";
};

/**
 * It will set and encrypted cookie to localhost and lateron we can use this cookie by decrypting it.
 * @param  {string} key
 * @param {any} data
 *
 * @isTestWrittenForThisFunction `true`
 */
export const setEncryptedCookie = <T extends string | object | boolean | Array<string> | Array<{ [key: string]: string | object }>>(key: string, data: T) => {
	if (data && key) {
		const encryptedString = encryptData(data);
		const keyName = cookieKeys.cookieInitial + "-" + key.trim();
		const date = new Date();
		const expiryTime = new Date(date.setTime(date.getTime() + cookieExpiresInDays * 24 * 60 * 60 * 1000)).toUTCString();
		document.cookie = `${keyName}=${encryptedString};expires=${expiryTime};domain=${window.location.hostname.replace("accounts", "")};secure;path=/;`;
	}
};

/**
 * This function will take cookie name as input and returns its decrypted value
 *
 * @param {string} key the name of the cookie
 * @returns {string} decrypted cookie string
 *
 * @isTestWrittenForThisFunction `true`
 */
export const getDecryyptedCookie = (key: string) => {
	if (key) {
		const keyName = cookieKeys.cookieInitial + "-" + key.trim();
		const cookieData = getCookie(keyName);
		if (cookieData) {
			return decryptData(cookieData);
		}
	}
};

/**
 * It will take a key as Input and returns the cookie value of that key
 * @param {string} cookieName
 * @returns {string} cookie
 *
 * @isTestWrittenForThisFunction `false`
 */
export const getCookie = (cookieName: string) => {
	const name = cookieName + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	if (decodedCookie) {
		const ca = decodedCookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i].trim();
			while (c.charAt(0) === "") {
				c = c.substring(1);
			}
			if (+c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
	}
	return "";
};

/**
 * It will set cookie for localhost use, without any encryption - it will set as it is.
 * We are using this function for localHostLogin [useLocalhostLogin] custom hook.
 *
 * @param {string} key
 * @param {any} data
 *
 * @isTestWrittenForThisFunction `false`
 */
export const setcheckpointCookieForLocalhost = <T extends string | object | boolean | Array<string> | Array<{ [key: string]: string | object }>>(key: string, data: T) => {
	if (data && key) {
		const keyName = cookieKeys.cookieInitial + "-" + key.trim();
		const date = new Date();
		const expiryTime = new Date(date.setTime(date.getTime() + cookieExpiresInDays * 24 * 60 * 60 * 1000)).toUTCString();
		document.cookie = `${keyName}=${data};expires=${expiryTime};domain=${window.location.hostname.replace("accounts", "")};secure;path=/;`;
	}
};

/**
 * This function takes a key as input and remove that key's cookie from storage.
 * @param {string} key name of the cookie
 *
 * @isTestWrittenForThisFunction `false`
 */
export const removedCookie = (key: string) => {
	if (key) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const keyName = cookieKeys.cookieInitial + "-" + key.trim();
		document.cookie = `${keyName}=;expires=${new Date(0).toUTCString()};domain=${window.location.hostname.replace("nft", "")};path=/;`;
		// document.cookie = `${keyName}=;expires=${new Date(0).toUTCString()};domain=localhost;path=/;`;
	}
};

/**
 *
 * @param {isRedirect} boolean if true user will be redirect to login page
 * @returns Either redirect to login page or return null
 *
 * @isTestWrittenForThisFunction `false`
 */
export const handleLogout = () => {
	sessionStorage.clear();
	removedCookie(cookieKeys.cookieUser);
	removedCookie(cookieKeys.cookiePermission);
	removedCookie(cookieKeys.cookieCurrentModule);
	removedCookie(cookieKeys.cookieUserData);
	return null;
};

export const handleS3ImageURL = (imageName: string) => {
	const imageUrl = process.env.REACT_APP_S3_URL;
	return `${imageUrl}${imageName}`;
};

export const getFormattedDate = (date: string) => {
	return moment(date).format(dateFormat);
};

export const getStatusCode = (statusCode: number) => {
	let result = {
		label: "",
		class: ""
	}; // eslint-disable-next-line
	switch (statusCode) {
		case 0:
			result = {
				label: "Pending",
				class: "pending"
			};
			break;
		case 1:
			result = {
				label: "Approved",
				class: "active"
			};
			break;
		case 2:
			result = {
				label: "Rejected",
				class: "deactive"
			};
			break;

		case 3:
			result = {
				label: "In-Process",
				class: "inprocess"
			};
			break;
		case 4:
			result = {
				label: "Visible",
				class: "active"
			};
			break;
		case 5:
			result = {
				label: "Disable",
				class: "deactive"
			};
			break;
		default:
			result = {
				label: "Not Started",
				class: "pending"
			};
			break;
	}
	return result;
};

export const handleFormikTrim = (name: string, value: string, setValue: any) => {
	if (value.trim()) {
		setValue(name, value);
	} else {
		setValue(name, value.trim());
	}
};
