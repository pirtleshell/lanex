import React from "react"

import { Link } from "gatsby"
import { Router } from "@reach/router"
import Layout from "../components/layout"

const things = ["hello", "magic", "oogabooga", "other"]

const Menu = () => {
  return (
    <ol>
      <li>
        <Link to={"/galaxies/"}>
          Go to Home
        </Link>
      </li>
      {things.map(thing => (
        <li>
          <Link to={"/galaxies/" + thing} key={thing + "-link"}>
            Go to {thing}
          </Link>
        </li>
      ))}
    </ol>
  )
}

const TestPage = ({ magic }) => {
  return (
    <div>
      <h1>{magic}</h1>
      <p>testing</p>
    </div>
  )
}

const IndexPage = () => (
  <Layout>
    <Menu />
    <Router basepath="/galaxies">
      {things.map(thing => (
        <TestPage magic={thing} key={thing} path={thing} />
      ))}
      <TestPage magic="home!" path="/" />
    </Router>
  </Layout>
)

export default IndexPage
