/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";
import { Spinner } from "reactstrap";
import { defaultUserImg, validationMessages } from "../../utils/constants/Constants";
import { toastError } from "../../utils/functions";

interface IColumnComponent {
	setProfileImage: any;
	linkOpen?: boolean;
	profile: {
		img: string;
		error: boolean;
		loading: boolean;
	};
	setProfile: React.Dispatch<
		React.SetStateAction<{
			img: string;
			error: boolean;
			loading: boolean;
		}>
	>;
}

const ColumnComponent: FC<IColumnComponent> = ({ setProfileImage, profile, setProfile, linkOpen }) => {
	const getBase64 = (file: any) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	const handleImgError = () => {
		setProfile({
			...profile,
			error: true,
			loading: false
		});
	};

	const handleLoad = () => {
		setProfile({
			...profile,
			loading: false
		});
	};
	const handleChange = (e: any) => {
		if (!e?.target?.files) return null;
		const file = e?.target?.files[0];
		const allowedExtension = ["image/jpeg", "image/jpg", "image/png"];
		if (allowedExtension.indexOf(file?.type) > -1) {
			if (file.size > 1024 * 1024 * 5) {
				return toastError("Maximum image size is 5 MB");
			} else {
				getBase64(file).then((data: any) => setProfile({ ...profile, loading: true, error: false, img: data }));
				setProfileImage("profilePic", file);
			}
		} else {
			return toastError(validationMessages.invalidFile);
		}
	};

	return (
		<>
			<hr className="m-0" />
			<div className="d-flex align-items-center info-field flex-wrap p-20">
				<div className="info-name">
					<p className="font-12 color-black2 fw-normal">PHOTO</p>
				</div>
				<div className="d-flex align-items-center info-image">
					<div className="photo d-flex align-items-center justify-content-center position-relative">
						{profile.loading ? <Spinner className="position-absolute" /> : null}
						<img
							className=""
							style={{
								objectFit: "cover",
								borderRadius: "50%",
								height: "100%",
								width: "100%"
							}}
							src={profile?.error ? defaultUserImg : profile.img}
							alt="profile"
							onError={handleImgError}
							onLoad={handleLoad}
						/>
					</div>
					<input style={{ display: "none" }} type="file" id="user_profile" accept=".png, .jpg" onChange={handleChange} />
					{linkOpen ? (
						<span
							className="font-14 fw-bold color-blue"
							style={{ cursor: "pointer" }}
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							//@ts-ignore
							onClick={() => document.getElementById("user_profile").click()}>
							Change photo
						</span>
					) : null}
				</div>
			</div>
		</>
	);
};

export default ColumnComponent;
