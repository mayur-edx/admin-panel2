import { FC, memo } from "react";

interface ITitleDashboard {
	title: string;
	count: any;
	cursor?: string;
	onClick?: () => void;
	width?: string;
	marginTop?: string;
}
const TitleDashboard: FC<ITitleDashboard> = ({ title, count, width, cursor, marginTop, ...reset }) => {
	return (
		<div
			className="d-flex align-items-center box"
			style={{
				cursor: `${cursor}`,
				width: `${width}`,
				marginTop: `${marginTop}`
			}}
			{...reset}>
			<p className="font-26 fw-900 m-0 pr-10">{count}</p>
			<p className="font-20 m-0">{title}</p>
		</div>
	);
};

export default memo(TitleDashboard);
