import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const updateLabelAPI = (body: any): Promise<IUpdateLableAPIres> => {
	return HTTPService.put(API_END_POINTS.LABEL_SETTINGS.UPDATE_LABEL, body);
};

interface IUpdateLableAPIres {
	status: number;
	message: string;
}
