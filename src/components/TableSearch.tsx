import { FC, useEffect, useState } from "react";
import { Input } from "reactstrap";
import { useDebouncedEffect } from "../hooks";
import { debounceTimeInMilliseconds } from "../utils/constants/Constants";

interface ITableSearch {
	paginationConfig: any;
	setPaginationConfig: any;
	placeholder: string;
}

const TableSearch: FC<ITableSearch> = ({ paginationConfig, setPaginationConfig, placeholder }) => {
	const [search, setSearch] = useState("");
	const [searchStatus, setSerachState] = useState(false);

	const handleChange = (e: any) => {
		if (e.target.value.trim()) {
			setSearch(e.target.value);
			setSerachState(true);
		} else {
			setSearch("");
			setSerachState(true);
		}
	};

	const changeSearchState = () => {
		if (search !== paginationConfig.search) {
			setPaginationConfig({
				...paginationConfig,
				page: 1,
				search: search.trim()
			});
		}
	};

	useEffect(() => {
		if (paginationConfig.search === "") {
			setSearch("");
		}
	}, [paginationConfig]);

	useDebouncedEffect(
		() => {
			if (!searchStatus) {
				if (search) {
					changeSearchState();
				}
			} else {
				if (search || search === "") {
					changeSearchState();
				}
			}
		},
		debounceTimeInMilliseconds,
		[search]
	);
	return <Input placeholder={placeholder} className="w-250px" value={search} onChange={handleChange} />;
};

export default TableSearch;
