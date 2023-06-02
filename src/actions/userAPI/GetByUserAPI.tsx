import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const GetByUserAPI = (body: IGetByUserAPIparams): Promise<IGetByUserAPIres> => {
	return HTTPService.get(API_END_POINTS.USER.GET_BY_USER + `${body?.userId}`);
};

interface IGetByUserAPIparams {
	userId: string;
}

export interface IGetByUserAPIresData {
	userId: string;
	lastName: string;
	firstName: string;
	email: string;
	permission: any;
	createdByUser: {
		firstName: string;
		lastName: string;
		userId: string;
	};
	adminRole: {
		roleId: string;
		roleName: string;
	};
}

interface IGetByUserAPIres {
	status: number;
	message: string;
	data: IGetByUserAPIresData;
}
