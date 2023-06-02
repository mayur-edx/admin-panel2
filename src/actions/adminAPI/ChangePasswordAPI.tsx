import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const ChangePasswordAPI = (body: IChangePasswordAPIparams): Promise<IChangePasswordAPIres> => {
	return HTTPService.patch(API_END_POINTS.ADMIN.CHANGE_PASSWORD, body);
};

interface IChangePasswordAPIparams {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

interface IChangePasswordAPIres {
	status: number;
	message: string;
}
