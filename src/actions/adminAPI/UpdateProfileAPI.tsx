import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const UpdateProfileAPI = (body: any): Promise<IUpdateProfileAPIres> => {
	return HTTPService.patch(API_END_POINTS.ADMIN.UPDATE_PROFILE, body);
};

interface IUpdateProfileAPIres {
	status: number;
	message: string;
}
