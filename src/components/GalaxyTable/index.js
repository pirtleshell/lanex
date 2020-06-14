
import React from 'react';
import PropTypes from "prop-types";

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
    const { galaxies, columns, sortBy, orderBy } = this.props;

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
