import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const getUsersAPI = (): Promise<IgetUsersAPIres> => {
	return HTTPService.get(API_END_POINTS.DASHBOARD.GET_USER);
};

export interface IgetUsersAPIresdata {
	userCount: number;
}

interface IgetUsersAPIres {
	status: number;
	message: string;
	data: IgetUsersAPIresdata;
}
