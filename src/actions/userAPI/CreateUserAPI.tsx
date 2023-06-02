import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const CreateUserAPI = (body: ICreateUserAPIparams): Promise<ICreateUserAPIres> => {
	return HTTPService.post(API_END_POINTS.USER.CREATE_USER, body);
};

interface ICreateUserAPIparams {
	firstName: string;
	lastName: string;
	email: string;
	roleId: string;
	permission: any;
}

interface ICreateUserAPIres {
	status: number;
	message: string;
}
