
import React from 'react';
import PropTypes from "prop-types";

// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import s from './GalaxyTable.css';

import GalaxyTableRow from './GalaxyTableRow';

class GalaxyTableBody extends React.Component {
  static propTypes = {
    galaxies: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
  };

  render() {
    const { galaxies, columns } = this.props;

    return (
      <tbody className="table-content">
        {galaxies.map(galaxy => (
          <GalaxyTableRow
            key={`pgc${galaxy.pgc}`}
            galaxy={galaxy}
            columns={columns}
          />
        ))}
      </tbody>
    );
  }
}

export default /* withStyles(s)(*/GalaxyTableBody;// );
