import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const LoginAPI = (body: ILoginAPIparams): Promise<ILoginAPIres> => {
	return HTTPService.post(API_END_POINTS.ADMIN.LOGIN, body);
};

interface ILoginAPIparams {
	email: string;
	password: string;
}

export interface IuserData {
	adminRoleId: {
		createdAt: string;
		createdBy: string;
		deletedAt: string;
		id: number;
		isActive: boolean;
		isDelete: boolean;
		roleId: string;
		roleName: string;
		updatedAt: string;
	};
	adminRole?: {
		createdAt: string;
		createdBy: string;
		deletedAt: string;
		id: number;
		isActive: boolean;
		isDelete: boolean;
		roleId: string;
		roleName: string;
		updatedAt: string;
	};
	firstName: string;
	isActive: boolean;
	isDelete: boolean;
	lastName: string;
	permission: any;
	email: string;
	profilePic: string;
	roleId: string;
	userId: string;
}

interface ILoginAPIres {
	status: number;
	message: string;
	data: {
		token: string;
		refreshToken: string;
		admin: IuserData;
	};
}
