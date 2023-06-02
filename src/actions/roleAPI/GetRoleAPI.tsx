import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const GetRoleAPI = (body: IGetRoleAPIparams): Promise<IGetRoleAPIres> => {
	return HTTPService.get(API_END_POINTS.ROLE.GET_ROLE, body);
};

interface IGetRoleAPIparams {
	filter?: string;
	search?: string;
	limit?: number;
	page?: number;
	roleName?: string;
}

export interface IGetRoleAPIresData {
	count: number;
	data: {
		createdAt: string;
		createdByUser: {
			firstName: string;
			lastName: string;
			userId: string;
		} | null;
		isActive: boolean;
		level: number;
		roleId: string;
		roleName: string;
		userCount: number;
	}[];
}

interface IGetRoleAPIres {
	status: number;
	message: string;
	data: IGetRoleAPIresData;
}
