import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const LogoutAPI = (): Promise<ILogoutAPIres> => {
	return HTTPService.post(API_END_POINTS.ADMIN.LOGOUT, {});
};

interface ILogoutAPIres {
	status: number;
	message: string;
}
