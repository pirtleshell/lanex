import React from "react";
import { Typography } from "@material-ui/core";
import Layout from "../components/layout";
import GalaxyTable from "../components/GalaxyTable";
import useGalaxyData from "../hooks/useGalaxyData";

const GalaxiesPage: React.FC = () => {
  const { loading, galaxies } = useGalaxyData({ closest: 25 });

  React.useEffect(() => {
    console.log(galaxies);
  }, [galaxies])

  return (
    <Layout>
      <Typography variant="h1">Galaxies</Typography>
      { loading && <Typography>Loading...</Typography>}
      <GalaxyTable galaxies={galaxies}/>
    </Layout>
  );
};

export default GalaxiesPage;
