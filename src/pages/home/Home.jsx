import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";

const Home = () => {
  const [transactions,setTransactions] = useState(null);
  var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Access-Control-Allow-Origin", "*");
	myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_KEY.concat('/transactions')}`, requestOptions)
    .then(response=>{
      if(response.ok){
        return response.json();
      }
    }).then(result=>{
      setTransactions(result);
    }).catch(e=> console.log("Error",e));
  },[]);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="users" />
          <Widget type="organizations" />
          <Widget type="vouchers" />
          <Widget type="transactions" />
        </div>
        <div className="charts">
          <Chart title="Last 3 Months Exchange Points For Vouchers" transactions={transactions} aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table data={transactions}/>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
