import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import RefreshIcon from '@mui/icons-material/Refresh';
import { dataFormat } from "../../datatablesource";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const Datatable = ({inputType}) => {
	const [data, setData] = useState(null);
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
		.then((result) => setData(result))
		.catch(error => console.log('error', error));
	};

	// get item list
	useEffect(() =>{
		fetchData();
	},[inputType]);

	// delete item
	const handleDelete = (id) => {
		requestOptions.method = 'DELETE';
		fetch(`${process.env.REACT_APP_API_KEY.concat(`/${inputType}`).concat(`/${id}`)}`, requestOptions)
		.then(response => {
			if(response.ok){
				setData(data.filter(item => item.id !== id));
				return response;
			}else{
				throw new Error('Fail to delete item!');
			}
		})
		.then(result => result)
		.catch(error => console.log('error', error));
	};

	const handleRefresh = () => {
		fetchData();
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
				<Link to={inputType==="Vouchers"? '/vouchers/new' : 'new'} className="link">
					+
				</Link>
			</div>
			<DataGrid
				className="datagrid"
				rows={data ?? {}}
				columns={dataFormat[inputType].concat(actionColumn)}
				pageSize={9}
				rowsPerPageOptions={[9]}
				checkboxSelection
			/>
		</div>
	);
};

export default Datatable;
