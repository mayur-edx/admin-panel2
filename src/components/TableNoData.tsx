import { FC } from "react";

interface ITableNoData {
	colSpan: number;
}
const TableNoData: FC<ITableNoData> = ({ colSpan }) => {
	return (
		<tr>
			<td className="text-center" colSpan={colSpan}>
				<span className="c-black fw-bold">No Data Found</span>
			</td>
		</tr>
	);
};

export default TableNoData;
