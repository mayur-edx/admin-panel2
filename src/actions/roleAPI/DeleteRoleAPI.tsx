import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const DeleteRoleAPI = (body: IDeleteRoleAPIparams): Promise<IDeleteRoleAPIres> => {
	return HTTPService.delete(API_END_POINTS.ROLE.DELETE_ROLE + `${body.roleId}`, {});
};

interface IDeleteRoleAPIparams {
	roleId: string;
}

interface IDeleteRoleAPIres {
	status: number;
	message: string;
}
