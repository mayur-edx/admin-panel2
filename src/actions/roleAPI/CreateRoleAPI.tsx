import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const CreateRoleAPI = (body: ICreateRoleAPIparams): Promise<ICreateRoleAPIres> => {
	return HTTPService.post(API_END_POINTS.ROLE.CREATE_ROLE, body);
};

interface ICreateRoleAPIparams {
	roleLevel: boolean;
	roleName: string;
	permission: any;
}

interface ICreateRoleAPIres {
	status: number;
	message: string;
}
