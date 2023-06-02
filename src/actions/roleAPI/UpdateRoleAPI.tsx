import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const UpdateRoleAPI = (body: IUpdateRoleAPIparams): Promise<IUpdateRoleAPIres> => {
	return HTTPService.patch(API_END_POINTS.ROLE.UPDATE_ROLE + `${body.roleId}`, body.data);
};

interface IUpdateRoleAPIparams {
	roleId: string;
	data: {
		roleName?: string;
		permission?: string;
		isActive?: boolean;
	};
}

interface IUpdateRoleAPIres {
	status: number;
	message: string;
}
