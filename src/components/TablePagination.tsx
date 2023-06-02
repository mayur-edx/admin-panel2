import { faAngleDoubleLeft, faAngleDoubleRight, faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";
import { Dropdown, DropdownMenu, DropdownToggle, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { rowsPerPage } from "../utils/constants/Constants";

interface ITablePagination {
	paginationConfig: any;
	setPaginationConfig: any;
	totalCount: number;
}

const TablePagination: FC<ITablePagination> = ({ paginationConfig, setPaginationConfig, totalCount }) => {
	const [dropdownPage, setDropdownPage] = useState(false);
	const [rowPerPage, setRowPerPage] = useState(rowsPerPage[0]);

	useEffect(() => {
		setRowPerPage(paginationConfig.limit);
	}, [paginationConfig.limit]);

	const pageToggle = () => setDropdownPage((prevState) => !prevState);
	const handleNext = () => {
		setPaginationConfig({
			...paginationConfig,
			page: paginationConfig.page + 1
		});
	};

	const handlePrevious = () => {
		setPaginationConfig({
			...paginationConfig,
			page: paginationConfig.page - 1
		});
	};

	const goToFirstPage = () => {
		setPaginationConfig({
			...paginationConfig,
			page: 1
		});
	};

	const goToLastPage = () => {
		setPaginationConfig({
			...paginationConfig,
			page: Math.ceil(totalCount / paginationConfig.limit)
		});
	};

	/**
	 * @start
	 * @Talbe_Pagination
	 */
	const onHandleRowPerPageChange = (el: any) => {
		setRowPerPage(el);
		setDropdownPage(false);
		setPaginationConfig({
			...paginationConfig,
			page: 1,
			limit: el
		});
	};

	const calculateLastPageRange = () => {
		const lastPage = paginationConfig.limit * paginationConfig.page;
		if (lastPage > totalCount) {
			return totalCount;
		} else {
			return lastPage;
		}
	};

	const calculateFirstPageRange = () => {
		if (paginationConfig.page === 1) {
			return paginationConfig.page;
		} else {
			return paginationConfig.limit * (paginationConfig.page - 1) + 1;
		}
	};

	return (
		<div className="d-flex justify-content-between flex-wrap pagination">
			<div className="d-flex align-items-center justify-content-center">
				<p className="font-13 color-light-grey m-0">Rows per page</p>
				<Dropdown isOpen={dropdownPage} toggle={pageToggle} className="d-flex align-items-center justify-content-center ml-10 mr-10">
					<DropdownToggle className="bg-white color-light-grey w-100 h-100 border-grey p-10 row-count">
						{rowPerPage}
						<FontAwesomeIcon icon={faChevronDown} className="color-light-grey font-12 ml-10" />
					</DropdownToggle>
					<DropdownMenu className="p-0 rounded-0 w-100 border-grey">
						<div style={{ cursor: "pointer" }}>
							{rowsPerPage.map((el, index) => {
								return (
									<p key={index} onClick={() => onHandleRowPerPageChange(el)} className="color-dark-grey hover-page font-14 p_5 m-0 page-name">
										{el}
									</p>
								);
							})}
						</div>
					</DropdownMenu>
				</Dropdown>
				<p className="font-13 color-light-grey m-0">{`${calculateFirstPageRange()} - ${calculateLastPageRange()} of ${totalCount}`}</p>
			</div>
			<Pagination className="pagination-section">
				<PaginationItem className={`pagination-number mr-10 ${paginationConfig.page === 1 && "disabled"}`} onClick={() => (paginationConfig.page > 1 ? goToFirstPage() : null)}>
					<PaginationLink href="#" className="p_5 grey-border rounded-2 d-flex align-items-center justify-content-center">
						<FontAwesomeIcon icon={faAngleDoubleLeft} className="font-13 d-flex align-items-center justify-content-center" />
					</PaginationLink>
				</PaginationItem>

				<PaginationItem className={`pagination-number mr-10 ${paginationConfig.page === 1 && "disabled"}`} onClick={() => (paginationConfig.page > 1 ? handlePrevious() : null)}>
					<PaginationLink href="#" className="p_5 grey-border rounded-2 d-flex align-items-center justify-content-center">
						<FontAwesomeIcon icon={faChevronLeft} className="font-13 d-flex align-items-center justify-content-center" />
					</PaginationLink>
				</PaginationItem>

				<PaginationItem className={`pagination-number mr-10 ${calculateLastPageRange() === totalCount && "disabled"}`} onClick={() => (calculateLastPageRange() < totalCount ? handleNext() : null)}>
					<PaginationLink href="#" className="p_5 grey-border rounded-2 d-flex align-items-center justify-content-center">
						<FontAwesomeIcon icon={faChevronRight} className="font-13 d-flex align-items-center justify-content-center" />
					</PaginationLink>
				</PaginationItem>

				<PaginationItem className={`pagination-number ${calculateLastPageRange() === totalCount && "disabled"}`} onClick={() => (calculateLastPageRange() < totalCount ? goToLastPage() : null)}>
					<PaginationLink href="#" className="p_5 grey-border rounded-2 d-flex align-items-center justify-content-center">
						<FontAwesomeIcon icon={faAngleDoubleRight} className="font-13 d-flex align-items-center justify-content-center" />
					</PaginationLink>
				</PaginationItem>
			</Pagination>
		</div>
	);
};

export default TablePagination;
