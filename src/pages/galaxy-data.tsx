import React from "react";
import { Link } from 'gatsby';
import { Typography } from "@material-ui/core";
import Layout from "../components/layout";
import GalaxyTable from "../components/GalaxyTable";
import useGalaxyData from "../hooks/useGalaxyData";
import { Galaxy, getGalaxyName } from "../models/Galaxy";

const GalaxiesPage: React.FC = () => {
  const { loading, galaxies } = useGalaxyData({ closest: 25 });

  return (
    <Layout>
      <Typography variant="h1">Galaxies</Typography>
      <GalaxyTable galaxies={galaxies} columns={columns} />
      {loading && <Typography>Loading...</Typography>}
    </Layout>
  );
};

const columns = [
  {
    header: "PGC",
    accessor: "pgc",
  },
  {
    header: "Name",
    // accessor: "name",
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
  // {
  //   header: "Maj. Axis",
  //   accessor: "a",
  // },
  // {
  //   header: "Min. Axis",
  //   accessor: "b",
  // },
  // {
  //   header: "Type",
  //   accessor: "mtype",
  // },
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
