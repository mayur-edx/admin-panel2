import { HTTPService } from "../../utils/axios";
import { API_END_POINTS } from "../../utils/constants/ApiEndPoints";
import { IGetGlobalSettingAPIdata } from "./GetGlobalSettingAPI";

export const UpdateGlobalSettingAPI = (body: IUpdateGlobalSettingAPIparams): Promise<IUpdateGlobalSettingAPIres> => {
	return HTTPService.patch(API_END_POINTS.GLOBAL_SETTINGS.UPDATE_GLOBAL_SETTINGS, body);
};

interface IUpdateGlobalSettingAPIparams {
	underMaintenance?: boolean;
	comingSoon?: boolean;
	frgtPwdMail?: string;
}

interface IUpdateGlobalSettingAPIres {
	status: number;
	message: string;
	data: IGetGlobalSettingAPIdata;
}
