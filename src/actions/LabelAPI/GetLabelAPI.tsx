import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const getLabelAPI = (): Promise<IGetLabelAPIres> => {
	return HTTPService.get(API_END_POINTS.LABEL_SETTINGS.GET_LABEL);
};

export interface IGetLabelObject {
	id: string;
	createdAt?: string;
	deletedAt?: string;
	updatedAt?: string;
	labels: {
		DE: string;
		EN: string;
	};
}

export interface IGetLabelAPIres {
	status: number;
	message: string;
	data: IGetLabelObject;
}
