
import React from 'react';
import PropTypes from "prop-types";

class GalaxyTableRow extends React.Component {
  static propTypes = {
    galaxy: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
  };

  render() {
    const { galaxy, columns } = this.props;
    const cells = columns.map(column => {
      let field = galaxy[column.accessor];
      if (column.render instanceof Function) {
        field = column.render(galaxy);
      }
      const id = `${column.accessor}-${galaxy.pgc}`;
      return (
        <td key={id}>{field}</td>
      );
    });

    return (
      <tr id={`row-${galaxy.pgc}`}>
        {cells}
      </tr>
    );
  }
}

export default GalaxyTableRow;
