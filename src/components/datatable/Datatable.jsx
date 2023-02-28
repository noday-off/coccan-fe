import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
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
    requestOptions.method = 'DELETE';
    fetch(`${process.env.REACT_APP_API_KEY.concat(`/${inputType}`).concat(`/${id}`)}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    //setData(data.filter((id) => data.id != id));
    navigate(0);
  };
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        switch (inputType) {

          case 'Organizations':
            return (
              <div className="cellAction">
                <Link to={`/organizations/${params.row.id}`} style={{ textDecoration: "none" }}>
                  <div className="viewButton">View</div>
                </Link>
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row.id)}
                >
                  Delete
                </div>
              </div>
            )
            break;
          default: 
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
        }
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {inputType}
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
