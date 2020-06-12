import React from "react";

import { Link } from "gatsby";
import { Router } from "@reach/router";
import Layout from "../components/layout";
import GalaxyDetail from "../components/GalaxyDetail";
import useGalaxyData from "../hooks/useGalaxyData";

const NUM_GALAXIES = 5;

const Menu = () => {
  const { pgcs } = useGalaxyData({ brightest: NUM_GALAXIES });

  return (
    <ol>
      <li key="home">
        <Link to={"/galaxies/"}>Go to Home</Link>
      </li>
      {pgcs.map((galaxyId) => (
        <li key={galaxyId}>
          <Link to={"/galaxies/" + galaxyId}>Go to {galaxyId}</Link>
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
