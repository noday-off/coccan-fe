import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

const List = ({data}) => {
  const [rows,setRows] = useState(null);
  useEffect(()=>{
    setRows(data);
  },[data]);
  rows?.forEach((item)=>{
    let t = `${item.createdDatetime}`.split(/[-T:]/);
    item.createdDateJS = new Date(Date.UTC(t[0],t[1]-1,t[2],t[3],t[4],t[5]))
    console.log(item.createdDateJS.toString())
  })
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Points</TableCell>
            <TableCell className="tableCell">Created Date</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row,idx,arr) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.description}</TableCell>
              <TableCell className="tableCell">{row.points}</TableCell>
              <TableCell className="tableCell">{row.createdDatetime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
