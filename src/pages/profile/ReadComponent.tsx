import { FC, memo } from "react";

interface IReadComponent {
	title: string;
	value?: number | string;
	color?: string;
}
const ReadComponent: FC<IReadComponent> = ({ title, value, color }) => {
	return (
		<>
			<hr className="m-0" />
			<div className="row p-20">
				<div className="info-name col-1">
					<p className="font-12 color-black2 fw-normal text-upper">{title}</p>
				</div>
				<div className="col-9">
					<p className="color-black2 font-16 fw-bold info-text" style={{ color: color }}>
						{value}
					</p>
				</div>
			</div>{" "}
		</>
	);
};

export default memo(ReadComponent);
