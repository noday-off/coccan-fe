import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { dataFormat } from "../../datatablesource";
import RefreshIcon from '@mui/icons-material/Refresh';
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const Datatable_Single = ({inputType,user}) => {
	const [transactions, setTransactions] = useState([]);
	const {auth} = useContext(AuthContext);
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Access-Control-Allow-Origin", "*");
	myHeaders.append("Authorization", `Bearer ${auth}`);
	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};
	const fetchData = () => {
		if (user!=null){
			console.log(user.wallets.length)
			fetch(`${process.env.REACT_APP_API_KEY.concat(`/${inputType}`).concat(`?walletId=${user.wallets[0].id}`)}`, requestOptions)
			.then(response =>response.json())
			.then((result) => {
				setTransactions(result.filter(transaction => transaction.walletId==user.wallets[0].id || transaction.walletId==user?.wallets[1]?.id));
			})
			.catch(error => console.log('error', error));

		}
	};
	// get item list
	useEffect(() =>{
		fetchData();
		console.log(transactions)
	},[inputType]);

	const handleRefresh = () => {
		fetchData();
	};
	return (
		<div className="datatable">
			<div className="datatableTitle">
				{inputType}
				<button onClick={handleRefresh}>
					<RefreshIcon className="icon" />
				</button>
			</div>
			<DataGrid
				className="datagrid"
				rows={transactions ?? {}}
				columns={dataFormat[inputType]}
				pageSize={9}
				rowsPerPageOptions={[9]}
				checkboxSelection
			/>
		</div>
	);
};

export default Datatable_Single;
