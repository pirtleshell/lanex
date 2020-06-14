import React from "react";

import { Router } from "@reach/router";
import Layout from "../components/layout";
import GalaxyDetail from "../components/GalaxyDetail";

const IndexPage = () => (
  <Layout>
    <Router basepath="/galaxies">
      <GalaxyDetail path="/:galaxyId" />
    </Router>
  </Layout>
);

export default IndexPage;
