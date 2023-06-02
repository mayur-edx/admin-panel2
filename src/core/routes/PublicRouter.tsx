import { Route, Routes } from "react-router-dom";
import { publicRoutesObj } from "./Router";

const PublicRouter = () => {
	return (
		<>
			<Routes>
				{publicRoutesObj.map((data, index) => (
					<Route index={true} key={index} path={data.path} element={data?.component} />
				))}
			</Routes>
		</>
	);
};

export default PublicRouter;
