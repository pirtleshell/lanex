import React from "react";
import { Link } from "gatsby";
import { Typography } from "@material-ui/core";
import GalaxyTable from "./GalaxyTable";
import useGalaxyData from "../hooks/useGalaxyData";
import { Galaxy } from "../models/Galaxy";

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
    render: (galaxy: Galaxy): number => galaxy.pgc(),
  },
  {
    header: "Name",
    render: (galaxy: Galaxy): React.ReactNode => (
      <Link to={`/galaxies/${galaxy.pgc()}`}>{galaxy.name()}</Link>
    ),
  },
  {
    header: "Distance (<abbr title='Megaparsecs'>Mpc</abbr>)",
    render: (galaxy: Galaxy): number => galaxy.dist(),
  },
  {
    header: "<abbr title='Right Ascension'>R.A.</abbr>",
    render: (galaxy: Galaxy): string => galaxy.ra(),
  },
  {
    header: "<abbr title='Declination'>Decl.</abbr>",
    render: (galaxy: Galaxy): string => galaxy.dec(),
  },
  {
    header: "B (<abbr title='Magnitude'>mag.</abbr>)",
    render: (galaxy: Galaxy): number => galaxy.magnitudes.B(),
  },
  {
    header: "Ks (<abbr title='Magnitude'>mag.</abbr>)",
    render: (galaxy: Galaxy): number => galaxy.magnitudes.Ks(),
  },
  {
    header: "Vhel (km/s)",
    render: (galaxy: Galaxy): number => galaxy.vhel(),
  },
];

export default GalaxiesPage;
