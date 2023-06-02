import { FC } from "react";
import { useSelector } from "react-redux";
import { Modal, ModalBody, Spinner } from "reactstrap";
import { IrootSlice } from "../store/Store";

interface IConfirmationModal {
	isOpen: {
		open: boolean;
		label: string;
		key: string;
		checked: boolean;
	};
	toggle: () => void;
	handleAction: (label: string, checked: string | boolean) => void;
}

const ConfirmationModal: FC<IConfirmationModal> = ({ isOpen, toggle, handleAction }) => {
	const isLoading = useSelector((state: IrootSlice) => state.loader.isLoading);
	const handleChange = () => {
		handleAction(isOpen.key, isOpen.checked);
	};
	const handleToogle = () => {
		isLoading ? null : toggle();
	};
	return (
		<Modal isOpen={isOpen.open} toggle={handleToogle} centered>
			<ModalBody className="p-4">
				<h2 className="fw-600 font-18 color-black1 mb-0">Confirmation</h2>
				<p className="color-light-grey mb-0 mt-10">{isOpen.label}</p>
				<div className="d-flex gap-4 mt-20">
					<button disabled={isLoading} className="w-100 custom-primary-outline" onClick={toggle}>
						No
					</button>
					<button disabled={isLoading} className="w-100 custom-primary" onClick={handleChange}>
						{isLoading ? (
							<div className="d-flex justify-content-center align-items-center">
								<span className=" fw-bold">Loading...</span>
								<Spinner className="ml-10" size={"sm"} />
							</div>
						) : (
							"Yes"
						)}
					</button>
				</div>
			</ModalBody>
		</Modal>
	);
};

export default ConfirmationModal;
