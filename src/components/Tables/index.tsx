import { FC } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const Tables: FC<any> = ({ chargingStations }) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">ADDRESS</TableCell>
            <TableCell align="left">NUMBER OF SOCKETS</TableCell>
            <TableCell align="left">SOCKET TYPE</TableCell>
            <TableCell align="left">FAVORITE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chargingStations.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.address}</TableCell>
              <TableCell align="left">{row.socketNumber}</TableCell>
              <TableCell align="left">{row.socketType}</TableCell>
              <TableCell align="center">
                <StarBorderIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* id address socketNumber socketType StarBorderIcon*/}
    </TableContainer>
  );
};

export default Tables;
