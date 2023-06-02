/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ViewRestricted } from "../../components/restrictions";
import { IrootSlice } from "../../store/Store";
import { Header } from "../layout/header";
import SidebarComponent from "../layout/sideBar/SideBar";
import { privateRoutesObj } from "./Router";

const PrivateRouter = () => {
	const { isSidebarOpen } = useSelector((state: IrootSlice) => state.sidebarToggle);
	const permissionSlice = useSelector((state: IrootSlice) => state.permission);

	return (
		<>
			<Header />
			<div className={"main d-flex"}>
				<SidebarComponent />
				<div className={`main-wrapper transiton-02s w-100 ${isSidebarOpen ? "" : "fullwidth"}`}>
					<Routes>
						{privateRoutesObj.map((data, index) => {
							if (permissionSlice?.permission?.[data.subModule]?.view) {
								return <Route key={`${data.path}${index}`} path={data.path} element={<ViewRestricted subModule={data.subModule}>{data.component}</ViewRestricted>} />;
							} else {
								return null;
							}
						})}
					</Routes>
				</div>
			</div>
		</>
	);
};

export default PrivateRouter;
