import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const GetPorfileAPI = (): Promise<IGetPorfileAPIres> => {
	return HTTPService.get(API_END_POINTS.ADMIN.GET_PROFILE);
};

export interface IGetPorfileAPIData {
	adminRole: {
		roleId: string;
		roleName: string;
	};
	email: string;
	firstName: string;
	lastName: string;
	profilePic: string;
}

interface IGetPorfileAPIres {
	status: number;
	message: string;
	data: IGetPorfileAPIData;
}
