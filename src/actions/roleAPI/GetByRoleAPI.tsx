import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const GetByRoleAPI = (body: IGetByRoleAPIparams): Promise<IGetByRoleAPIres> => {
	return HTTPService.get(API_END_POINTS.ROLE.GET_BY_ROLE + `${body.roleId}`);
};

interface IGetByRoleAPIparams {
	roleId: string;
}

export interface IGetByRoleAPIresData {
	createdByUser: {
		firstName: string;
		lastName: string;
		userId: string;
	};
	isActive: boolean;
	level: number;
	permission: any;
	roleId: string;
	roleName: string;
}

interface IGetByRoleAPIres {
	status: number;
	message: string;
	data: IGetByRoleAPIresData;
}
