import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const DeleteUserAPI = (body: IDeleteUserAPIparams): Promise<IDeleteUserAPIres> => {
	return HTTPService.delete(API_END_POINTS.USER.DELETE_USER + `${body.userId}`, {});
};

interface IDeleteUserAPIparams {
	userId: string;
}

interface IDeleteUserAPIres {
	status: number;
	message: string;
}
