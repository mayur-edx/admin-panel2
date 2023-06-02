import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const ResetPasswordAPI = (body: IResetPasswordAPIparams): Promise<IResetPasswordAPIres> => {
	return HTTPService.post(API_END_POINTS.ADMIN.RESET_PASSWORD, body);
};

interface IResetPasswordAPIparams {
	password: string;
	resetToken: string;
}

interface IResetPasswordAPIres {
	status: number;
	message: string;
}
