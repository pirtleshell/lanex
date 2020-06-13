
import React from 'react';
import PropTypes from "prop-types";
import { Link } from "gatsby";

import GalaxyTableHead from './GalaxyTableHead';
import GalaxyTableBody from './GalaxyTableBody';

class GalaxyTable extends React.Component {
  static propTypes = {
    galaxies: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    handleSort: PropTypes.func,
    sortBy: PropTypes.number,
    orderBy: PropTypes.number,
  };

  render() {
    const { galaxies, sortBy, orderBy } = this.props;

    const columns = [{
      header: 'PGC',
      accessor: 'pgc',
    }, {
      header: 'Name',
      accessor: 'name',
      render: galaxy => (
        <Link to={`/galaxies/${galaxy.pgc}`}>PGC {galaxy.pgc}</Link>
        ),
    }, {
      header: "Distance (<abbr title='Megaparsecs'>Mpc</abbr>)",
      accessor: 'dist',
    }, {
      header: "<abbr title='Right Ascension'>R.A.</abbr>",
      accessor: 'ra',
    }, {
      header: "<abbr title='Declination'>Decl.</abbr>",
      accessor: 'dec',
    }, {
      header: 'Maj. Axis',
      accessor: 'a',
    }, {
      header: 'Min. Axis',
      accessor: 'b',
    }, {
      header: 'Type',
      accessor: 'mtype',
    }, {
      header: "B (<abbr title='Magnitude'>mag.</abbr>)",
      accessor: 'b_mag',
    }, {
      header: "Ks (<abbr title='Magnitude'>mag.</abbr>)",
      accessor: 'ks_mag',
    }, {
      header: 'Vhel (km/s)',
      accessor: 'vhel',
    }];

    return (
          <table style={{ minWidth: 650 }}>
            <GalaxyTableHead
              columns={columns}
              handleSort={this.props.handleSort}
              sortBy={sortBy}
              orderBy={orderBy}
            />
            <GalaxyTableBody galaxies={galaxies} columns={columns} />
          </table>
    );
  }
}

export default /* withStyles(s)(*/GalaxyTable;// );
