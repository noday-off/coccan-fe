import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLoggedIn');
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">C O C C A N</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/organizations" style={{ textDecoration: "none" }}>
            <li>
              <StorefrontIcon className="icon" />
              <span>Organizations</span>
            </li>
          </Link>
          <Link to="/vouchers" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Vouchers</span>
            </li>
          </Link>
          <Link to="/universities" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Universities</span>
            </li>
          </Link>
          <Link to="/departments" style={{ textDecoration: "none" }}>
            <li>
              <WorkIcon className="icon" />
              <span>Departments</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/login" style={{ textDecoration: "none" }}>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
