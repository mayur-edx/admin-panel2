import { FC, ReactNode, useState } from "react";
import "../../components/tooltip/customTooltip.css";

/**
 *
 * @param props
 * @param1 - {content} - childrens to be rendered as tooltip content
 * @param2 - {position} - string - top | right | bottom | right
 * @param3 - {delay} - numbers - delay befor tooltip renders
 * @returns JSX element
 */

interface ICustomTooltip {
	children: ReactNode;
	delay?: number;
	direction: string;
	content: string;
	className?: string;
}
const CustomTooltip: FC<ICustomTooltip> = ({ children, delay, direction, content, className }) => {
	let timeout: any;

	const [active, setActive] = useState(false);

	const showTip = () => {
		timeout = setTimeout(() => {
			setActive(true);
		}, delay || 100);
	};

	const hideTip = () => {
		clearInterval(timeout);
		setActive(false);
	};

	return (
		<div className={`Tooltip-Wrapper ${className ? className : ""}`} onMouseEnter={showTip} onMouseLeave={hideTip}>
			{children}
			{active && <div className={`Tooltip-Tip ${direction || "top"}`}>{content}</div>}
		</div>
	);
};

export default CustomTooltip;
