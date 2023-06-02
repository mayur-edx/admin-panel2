import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";

export const GetGlobalSettingAPI = (): Promise<IGetGlobalSettingAPIres> => {
	return HTTPService.get(API_END_POINTS.GLOBAL_SETTINGS.GET_GLOBAL_SETTINGS);
};

export interface IGetGlobalSettingAPIdata {
	comingSoon: boolean;
	createdAt: string;
	id: number;
	updatedAt: string;
	frgtPwdMail: string;
	underMaintenance: boolean;
}

interface IGetGlobalSettingAPIres {
	status: number;
	message: string;
	data: IGetGlobalSettingAPIdata;
}
