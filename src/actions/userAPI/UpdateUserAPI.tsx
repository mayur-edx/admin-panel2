import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const UpdateUserAPI = (body: IUpdateUserAPIparams): Promise<IUpdateUserAPIres> => {
	return HTTPService.patch(API_END_POINTS.USER.UPDATE_USER + `${body.userId}`, body.data);
};

interface IUpdateUserAPIparams {
	userId: string;
	data: {
		roleId?: string;
		permission?: string;
		firstName?: string;
		lastName?: string;
		isActive?: boolean;
		email?: string;
	};
}

interface IUpdateUserAPIres {
	status: number;
	message: string;
}
