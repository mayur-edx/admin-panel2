import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const GetUserAPI = (body: IGetUserAPIparams): Promise<IGetUserAPIres> => {
	return HTTPService.get(API_END_POINTS.USER.GET_USER, body);
};

interface IGetUserAPIparams {
	filter?: string;
	search?: string;
	limit?: number;
	page?: number;
	email?: string;
}

export interface IGetUserAPIresData {
	count: number;
	data: {
		firstName: string;
		lastName: string;
		userId: string;
		email: string;
		createdAt: string;
		deletedAt: string;
		isActive: boolean;
		adminRole: {
			roleName: string;
			roleId: string;
		} | null;
		createdByUser: {
			firstName: string;
			lastName: string;
			userId: string;
		};
	}[];
}

interface IGetUserAPIres {
	status: number;
	message: string;
	data: IGetUserAPIresData;
}
