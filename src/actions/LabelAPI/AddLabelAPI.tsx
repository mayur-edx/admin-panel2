import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const addLabelAPI = (body: any): Promise<ICreateLableAPIres> => {
	return HTTPService.post(API_END_POINTS.LABEL_SETTINGS.CREATE_LABEL, body);
};

interface ICreateLableAPIres {
	status: number;
	message: string;
}
