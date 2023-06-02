import { FC } from "react";
import { Spinner } from "reactstrap";

interface ITableLoading {
	colSpan: number;
}

const TableLoading: FC<ITableLoading> = ({ colSpan }) => {
	return (
		<tr>
			<td className="text-center" colSpan={colSpan}>
				<span className="fw-bold mr-10">Loading...</span>
				<Spinner size={"sm"} />
			</td>
		</tr>
	);
};

export default TableLoading;
