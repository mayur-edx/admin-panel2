import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const ForgetPasswordAPI = (body: IForgotPasswordAPIparams): Promise<IForgotPasswordAPIres> => {
	return HTTPService.post(API_END_POINTS.ADMIN.FORGET_PASSWORD, body);
};

interface IForgotPasswordAPIparams {
	email: string;
}

interface IForgotPasswordAPIres {
	status: number;
	message: string;
}
