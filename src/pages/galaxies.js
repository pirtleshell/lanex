import React from "react";

import { Router } from "@reach/router";
import Layout from "../components/layout";
import GalaxyDetail from "../components/GalaxyDetail";
import GalaxyDataTable from "../components/GalaxyDataTable";

const IndexPage = () => (
  <Layout>
    <Router basepath="/galaxies">
      <GalaxyDetail path="/:galaxyId" />
      <GalaxyDataTable path="/" />
    </Router>
  </Layout>
);

export default IndexPage;
