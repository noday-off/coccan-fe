import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { dataFormat } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";

const Datatable = ({inputType}) => {
  const [data, setData] = useState(null);
  const {auth} = useContext(AuthContext);
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Authorization", `Bearer ${auth.accessToken}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  // get item list
  useEffect(() =>{
    fetch(`${process.env.REACT_APP_API_KEY.concat(`/${inputType}`)}`, requestOptions)
    .then(response => response.json())
    .then((result) => setData(result))
    .catch(error => console.log('error', error));
  },[inputType]);

  // delete item
  const handleDelete = (id) => {
    // requestOptions.method = 'DELETE';
    // fetch(`${process.env.REACT_APP_API_KEY.concat(`/${inputType}`)}`, requestOptions)
    // .then(response => response.json())
    // .then((result) => setData(result))
    // .catch(error => console.log('error', error));
    setData(data.filter((item) => item.id !== id));
  };
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
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
        Add New User
        <Link to='new' className="link">
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
