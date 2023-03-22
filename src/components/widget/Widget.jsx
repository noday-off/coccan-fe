import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SchoolIcon from '@mui/icons-material/School';
import { useEffect, useState } from "react";

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
    .then(response=>response.json()).then(result=>{
      amount = result?.length;
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
        link: "View all orders",
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
        link: "View net earnings",
        icon: (
          <LocalActivityIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "universities":
      data = {
        title: "UNIVERSITY",
        isMoney: true,
        link: "See details",
        icon: (
          <SchoolIcon
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
        <span className="title">{data.title}</span>
        <span className="counter">
          {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
