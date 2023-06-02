import ChangesPassword from "./components/ChangesPassword";
import UpdateProfile from "./components/UpdateProfile";

const Profile = () => {
	return (
		<div className="pl-25">
			<div className="row justify-content-between">
				<UpdateProfile />
				<ChangesPassword />
			</div>
		</div>
	);
};

export default Profile;
