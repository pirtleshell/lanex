import React from "react";
import { Link } from "gatsby";
import {
  Box,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import useGalaxyData from "../hooks/useGalaxyData";

interface Props {
  galaxyId: number;
}

const GalaxyDetail: React.FC<Props> = ({ galaxyId }) => {
  const pgc = parseInt(String(galaxyId));
  const { loading, galaxy } = useGalaxyData({ pgc });

  if (isNaN(pgc)) {
    return <p>404. Galaxy id must be a number.</p>;
  }

  return (
    <Box>
      {loading ? (
        <p>Loading galaxy data...</p>
      ) : galaxy ? (
        <Grid container>
          <Grid item md={12}>
            <Typography variant="h2">{galaxy.name()}</Typography>
          </Grid>
          <Grid item md={6}>
            <Typography>
              <strong>Names:</strong>
            </Typography>
            <List>
              {galaxy.names().map((name) => (
                <ListItem key={name}>{name}</ListItem>
              ))}
            </List>
          </Grid>
          <Grid item md={6}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Distance</TableCell>
                  <TableCell>{galaxy.dist()} Mpc</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Right Ascension</TableCell>
                  <TableCell>{galaxy.ra()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Declination</TableCell>
                  <TableCell>{galaxy.dec()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>B magnitude</TableCell>
                  <TableCell>{galaxy.magnitudes.B()} mag.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2MASS Ks magnitude</TableCell>
                  <TableCell>{galaxy.magnitudes.Ks()} mag.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Heliocentric Velocity</TableCell>
                  <TableCell>{galaxy.vhel()} km/s</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      ) : (
        <p>No galaxy with PGC {pgc} found in database.</p>
      )}
      <Link to="/galaxies/">Back to galaxies</Link>
    </Box>
  );
};

export default GalaxyDetail;
