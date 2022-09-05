import { FC, useEffect, useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFavorites from "../../hooks/useFavorites";
import Button from "@mui/material/Button";
import { ChargingStationType } from "../Content";

type TablesProps = {
  chargingStations: ChargingStationType[]
};

const Tables: FC<TablesProps> = ({ chargingStations }) => {
  const [stations, setStations] =
    useState<ChargingStationType[]>(chargingStations);
  const [favorites, toggleFavorite] = useFavorites();

  useEffect(() => {
    setStations(chargingStations);
  }, [favorites, chargingStations]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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
          {stations.map((row: ChargingStationType) => {
            const isFavorite = favorites.includes(row.id);

            return (
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
                  <Button onClick={toggleFavorite(row.id)}>
                    {isFavorite ? <StarIcon /> : <StarBorderIcon />}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
