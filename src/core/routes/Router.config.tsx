import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import useAuthCookieWatcher from "../../hooks/useCookieWatcher";
import { IrootSlice } from "../../store/Store";
import { cookieKeys } from "../../utils/constants/Constants";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const Routers = () => {
	const auth = useSelector((state: IrootSlice) => state.auth);
	const { isLoading } = useSelector((state: IrootSlice) => state.loader);

	// check if user auth cookie changes/deleted then logout him from current app.
	// ⚠ Be cautious while using this hook because it can keep your user logged-out in loop
	const { exist } = useAuthCookieWatcher(`${cookieKeys.cookieInitial}-${cookieKeys.cookieUser}`, 1000);
	useEffect(() => {
		// if the user is logged in but the auth cookie dosen't exist that means he is logged out from some other subdomains so logout him from current app too.
		if (!exist && auth?.isLoggedIn) {
			window.location.reload();
		} else if (exist && !auth?.isLoggedIn) {
			window.location.reload();
		}
	}, [exist]);

	return (
		<>
			<Toaster />
			{isLoading && (
				<div className="loader-wrapper">
					<Spinner type="grow" color="light" />
				</div>
			)}
			{auth?.isLoggedIn ? <PrivateRouter /> : <PublicRouter />}
		</>
	);
};

export default Routers;
