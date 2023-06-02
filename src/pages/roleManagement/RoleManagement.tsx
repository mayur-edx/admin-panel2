import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Table } from "reactstrap";
import { DeleteRoleAPI } from "../../actions/roleAPI/DeleteRoleAPI";
import { GetRoleAPI, IGetRoleAPIresData } from "../../actions/roleAPI/GetRoleAPI";
import ConfirmationModal from "../../components/ConfirmationModal";
import TableLoading from "../../components/TableLoading";
import TableNoData from "../../components/TableNoData";
import TablePagination from "../../components/TablePagination";
import TableSearch from "../../components/TableSearch";
import { CreateRestricted, DeleteRestricted, EditRestricted } from "../../components/restrictions";
import CustomTooltip from "../../components/tooltip/ToolTip";
import useUpdateDeleteRestricted from "../../hooks/restrictions/useUpdateDeleteResstricted";
import { setLoading } from "../../store";
import { ModuleName, initialPaginationConfig, primaryColor } from "../../utils/constants/Constants";
import { toastSuccess } from "../../utils/functions";
import { getFormattedDate } from "../../utils/functions/CommonFunctions";
import TableSwitch from "./components/TableSwitch";

const options = [
	{ value: "", label: "All" },
	{ value: "true", label: "Active" },
	{ value: "false", label: "Inactive" }
];

const RoleManagement = () => {
	const tableHeader = ["Role Name", "Created User", "User Count", "Status", "Created Date/Time", "Actions"];
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { updateDeleteRestrictedPermission } = useUpdateDeleteRestricted();
	const [isLoading, setIsLoading] = useState(false);
	const [selectData, setSelectData] = useState<{ value: string; label: string }>();
	const [paginationConfig, setPaginationConfig] = useState(initialPaginationConfig);
	const [isOpen, setIsopen] = useState<any>({
		open: false,
		label: "",
		key: "",
		checked: false
	});
	const [data, setData] = useState<IGetRoleAPIresData>({
		count: 0,
		data: []
	});

	const getRoleAction = () => {
		setIsLoading(true);
		const params: any = { limit: paginationConfig.limit, page: paginationConfig.page };
		if (paginationConfig.search) {
			params.search = paginationConfig.search;
		}
		if (paginationConfig.filter) {
			params.filter = paginationConfig.filter;
		}
		GetRoleAPI(params)
			.then((res) => {
				if (res.status === 200) {
					setData(res.data);
					setIsLoading(false);
				}
			})
			.catch(() => setIsLoading(false));
	};

	useEffect(() => {
		getRoleAction();
	}, [paginationConfig]);

	const handleRedireact = (url: string) => {
		navigate(url);
	};

	const deleteRoleAction = (key: string, roleId: string | boolean) => {
		dispatch(setLoading(true));
		DeleteRoleAPI({ roleId: String(roleId) })
			.then((res) => {
				if (res.status === 200) {
					getRoleAction();
					toastSuccess(res.message);
					handleToggle();
					dispatch(setLoading(false));
				}
			})
			.catch(() => handleToggle());
	};

	const handleClear = () => {
		setSelectData({ value: "", label: "All" });
		setPaginationConfig(initialPaginationConfig);
	};

	const handleToggle = () => {
		setIsopen({
			open: false,
			label: "",
			key: "",
			checked: false
		});
	};

	const handleDelete = (roleId: string, name: string) => {
		setIsopen({ open: true, label: `Are you sure you want to delete ${name} role ?`, checked: roleId, key: name });
	};

	return (
		<div className="holders">
			<h2 className="c-black fw-600">Role Management</h2>
			<div className="bg-white mt-10 rounded-1 p-20">
				<div className="d-flex justify-content-between table-box-height">
					<div className="d-flex">
						<TableSearch paginationConfig={paginationConfig} setPaginationConfig={setPaginationConfig} placeholder={"Search By Role Name"} />
						<Select
							theme={(theme) => ({
								...theme,
								borderRadius: 5,
								colors: {
									...theme.colors,
									primary25: "rgba(255, 139, 0, 0.1)",
									primary: primaryColor
								}
							})}
							className="ml-20 w-250px"
							id="react-select-2-listbox"
							placeholder="Role Status"
							value={selectData}
							onChange={(e: any) => {
								setSelectData(e);
								setPaginationConfig({ ...paginationConfig, filter: e.value });
							}}
							options={options}
						/>
						<button className="custom-primary-outline ml-20" onClick={handleClear}>
							Clear All
						</button>
					</div>
					<CreateRestricted subModule={ModuleName.ROLE_MANAGEMENT}>
						<button className="custom-primary" onClick={() => navigate("/role-management/create")}>
							Add Role
						</button>
					</CreateRestricted>
				</div>
				<div className="mt-20">
					<Table responsive className="table-section border-green">
						<thead>
							<tr>
								{tableHeader.map((item, i) => {
									if (item === "Actions") {
										if (updateDeleteRestrictedPermission(ModuleName.ROLE_MANAGEMENT)) {
											return <th key={i}>{item}</th>;
										}
									} else {
										return <th key={i}>{item}</th>;
									}
								})}
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<TableLoading colSpan={tableHeader?.length} />
							) : data?.data?.length === 0 ? (
								<TableNoData colSpan={tableHeader.length} />
							) : (
								data?.data?.map((item) => (
									<tr key={item?.roleId}>
										<td>{item?.roleName}</td>
										<td>{`${item?.createdByUser ? `${item?.createdByUser?.firstName} ${item?.createdByUser?.lastName}` : "root"} `}</td>
										<td>{item?.userCount}</td>
										<td>
											<TableSwitch item={item} />
										</td>
										<td>{getFormattedDate(item?.createdAt)}</td>
										{updateDeleteRestrictedPermission(ModuleName.ROLE_MANAGEMENT) ? (
											<td className="d-flex c-black">
												<EditRestricted subModule={ModuleName.ROLE_MANAGEMENT}>
													<CustomTooltip direction="top" content={"Edit Role"}>
														<FontAwesomeIcon onClick={() => handleRedireact(`/role-management/${item?.roleId}`)} icon={faEdit} className="cursor-pointer" />
													</CustomTooltip>
												</EditRestricted>
												<DeleteRestricted subModule={ModuleName.ROLE_MANAGEMENT}>
													<CustomTooltip direction="top" content={`${item.userCount > 0 ? "Role cannot be deleted" : "Delete Role"}`}>
														<FontAwesomeIcon onClick={() => handleDelete(item?.roleId, item?.roleName)} className={`ml-10 cursor-pointer ${item?.userCount > 0 ? "disable" : ""}`} icon={faTrash} />
													</CustomTooltip>
												</DeleteRestricted>
											</td>
										) : null}
									</tr>
								))
							)}
						</tbody>
					</Table>
					<TablePagination paginationConfig={paginationConfig} setPaginationConfig={setPaginationConfig} totalCount={data?.count} />
				</div>
			</div>
			<ConfirmationModal isOpen={isOpen} toggle={handleToggle} handleAction={deleteRoleAction} />
		</div>
	);
};

export default RoleManagement;
