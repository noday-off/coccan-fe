import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows, orgColumns, orgRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Datatable = ({inputType}) => {
  const [data, setData] = useState(inputType=="user"?userRows:orgRows);
  const url = inputType == 'user'? '/users/new':'/organizations/new';
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(() => {
    setData(inputType=="user"?userRows:orgRows);
  }, [inputType]);
  

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
        <Link to={url} className="link">
          +
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={inputType=='user'?userColumns.concat(actionColumn):orgColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
