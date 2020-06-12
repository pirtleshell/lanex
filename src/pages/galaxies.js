import React from "react";

import { Link } from "gatsby";
import { Router } from "@reach/router";
import Layout from "../components/layout";
import GalaxyDetail from '../components/GalaxyDetail';

// const things = [...Array(5).keys()].map(i => i+1);
const NUM_GALAXIES = 5;

const Menu = () => {
  const [galaxyIds, setGalaxyIds] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://laniakean.com/api/v1/galaxies/?brightest=${NUM_GALAXIES}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setGalaxyIds(data.pgcs);
      });
  }, []);

  return (
    <ol>
      <li key="home">
        <Link to={"/galaxies/"}>Go to Home</Link>
      </li>
      {galaxyIds.map((galaxyId) => (
        <li key={galaxyId}>
          <Link to={"/galaxies/" + galaxyId}>
            Go to {galaxyId}
          </Link>
        </li>
      ))}
    </ol>
  );
};

const IndexPage = () => (
  <Layout>
    <Menu />
    <Router basepath="/galaxies">
      <GalaxyDetail path="/:galaxyId" />
    </Router>
  </Layout>
);

export default IndexPage;
