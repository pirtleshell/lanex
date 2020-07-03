import React from "react";
import { Link } from 'gatsby';
import { Typography } from "@material-ui/core";
import GalaxyTable from "./GalaxyTable";
import useGalaxyData from "../hooks/useGalaxyData";
import { Galaxy, getGalaxyName } from "../models/Galaxy";

const GalaxiesPage: React.FC = () => {
  const { loading, galaxies } = useGalaxyData({ closest: 25 });

  return (
    <>
      <Typography variant="h1">Galaxies</Typography>
      <GalaxyTable galaxies={galaxies} columns={columns} />
      {loading && <Typography>Loading...</Typography>}
    </>
  );
};

const columns = [
  {
    header: "PGC",
    accessor: "pgc",
  },
  {
    header: "Name",
    render: (galaxy: Galaxy): React.ReactNode => (
      <Link to={`/galaxies/${galaxy.pgc}`}>{getGalaxyName(galaxy)}</Link>
    ),
  },
  {
    header: "Distance (<abbr title='Megaparsecs'>Mpc</abbr>)",
    accessor: "dist",
  },
  {
    header: "<abbr title='Right Ascension'>R.A.</abbr>",
    accessor: "ra",
  },
  {
    header: "<abbr title='Declination'>Decl.</abbr>",
    accessor: "dec",
  },
  {
    header: "B (<abbr title='Magnitude'>mag.</abbr>)",
    accessor: "B_mag",
  },
  {
    header: "Ks (<abbr title='Magnitude'>mag.</abbr>)",
    accessor: "Ks_mag",
  },
  {
    header: "Vhel (km/s)",
    accessor: "vhel",
  },
];

export default GalaxiesPage;
