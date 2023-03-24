import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import RefreshIcon from '@mui/icons-material/Refresh';
import { dataFormat } from "../../datatablesource";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImportForm from "../form/importForm";


const Datatable = ({inputType}) => {
	const [data, setData] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [importForm,setImportForm] = useState(false);
	const {auth} = useContext(AuthContext);
	const navigate = useNavigation;
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Access-Control-Allow-Origin", "*");
	myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	const fetchData = () => {
		fetch(`${process.env.REACT_APP_API_KEY.concat(`/${inputType}`)}`, requestOptions)
		.then(response => response.json())
		.then((result) =>{
			setData(result);
			setDisabled(false);
		})

		.catch(error => console.log('error', error));
	};

	// get item list
	useEffect(() =>{
		setDisabled(true);
		fetchData();
	},[inputType]);

	// delete item
	const handleDelete = (id) => {
		requestOptions.method = 'DELETE';
		fetch(`${process.env.REACT_APP_API_KEY.concat(`/${inputType}`).concat(`/${id}`)}`, requestOptions)
		.then(response => {
			setDisabled(false);
			if(response.ok){
				setData(data.filter(item => item.id !== id));
				toast.success("Deleted successfully!");
				return response;
			}else{
				toast.error("Fail to delete!");
				throw new Error('Fail to delete item!');
			}
		})
		.then(result => result)
		.catch(error => console.log('error', error));
	};

	const handleRefresh = () => {
		setDisabled(true);
		fetchData();
		toast.info('Refreshed!');
	};

	const actionColumn = [
		{
			field: "action",
			headerName: "Action",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="cellAction">
						<Link to={`single?id=${params.row.id}`} style={{ textDecoration: "none" }}>
							<div className="viewButton">View</div>
						</Link>
						<div
							className="deleteButton"
							onClick={() => handleDelete(params.row.id)}
						>
							Delete
						</div>
					</div>
				);
			},
		},
	];
	return (
		<div className="datatable">
			<div className="datatableTitle">
				{inputType}
				<button onClick={handleRefresh}>
					<RefreshIcon className="icon" />
				</button>
				{ inputType !== "Transactions" &&
				<Link to='new' className="link">
					+
				</Link>
				}
			</div>

			{disabled?(
				<h1>Loading...</h1>
			)
			:(
			<>
				{importForm && <ImportForm setImportForm={setImportForm} />}
				<DataGrid
				className="datagrid"
				rows={data ?? {}}
				columns={inputType=== "Transactions"? dataFormat[inputType]:dataFormat[inputType].concat(actionColumn)}
				pageSize={9}
				rowsPerPageOptions={[9]}
				//checkboxSelection
				/>
				{inputType === "Users" && (
				<button onClick={() => setImportForm(true)} id="importBtn">Import file</button>
				)}
			</>
			)}
		</div>
	);
};

export default Datatable;
