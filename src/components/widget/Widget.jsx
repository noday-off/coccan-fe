import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SchoolIcon from '@mui/icons-material/School';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const Widget = ({ type }) => {
  let data;
  const diff = 20;
  const [amount,setAmount] = useState(100);
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
    fetch(`${process.env.REACT_APP_API_KEY.concat(`/${type}`)}`, requestOptions)
    .then(response=>response.json())
    .then(result=>{
      setAmount(result?.length);
    }).catch(e=> console.log("Error",e));
  },[amount]);

  switch (type) {
    case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "organizations":
      data = {
        title: "ORGANIZATIONS",
        isMoney: false,
        link: "View all organizations",
        icon: (
          <StorefrontIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "vouchers":
      data = {
        title: "VOUCHERS",
        isMoney: true,
        link: "View all vouchers",
        icon: (
          <LocalActivityIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "transactions":
      data = {
        title: "TRANSACTIONS",
        isMoney: true,
        link: "View all transactions",
        icon: (
          <CurrencyExchangeIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">
          {amount}
        </span>
        <span className="link">
          <Link to={`${type}`} style={{textDecoration : 'none',color:'black'}}>{data?.link}
          </Link></span>
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
        {data?.icon}
      </div>
    </div>
)};

export default Widget;
