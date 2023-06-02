import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const GetRolePermissionAPI = (): Promise<IGetRolePermissionAPIres> => {
	return HTTPService.get(API_END_POINTS.ROLE.GET_PERMISSION);
};

interface IGetRolePermissionAPIres {
	status: number;
	message: string;
	data: any;
}
