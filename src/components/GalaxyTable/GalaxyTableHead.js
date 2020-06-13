/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from "prop-types";

const ASC = 0;

class GalaxyTableHead extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    columns: PropTypes.array.isRequired,
    handleSort: PropTypes.func,
    sortBy: PropTypes.number,
    orderBy: PropTypes.number,
  };

  render() {
    const { columns, handleSort, className,
            sortBy, orderBy, ...props } = this.props;
    const caret = '<span class="caret" />';

    return (
      <thead>
        <tr>
          {columns.map((column, i) => {
            const key = `th-${column.accessor}`;
            const sortThis = sortBy === i;
            const contents = column.header + (sortThis ? caret : '');
            const classes = className +
              (sortThis && orderBy === ASC) ? 'dropup' : '';
            return (
              <th
                className={classes}
                key={key}
                value={i}
                dangerouslySetInnerHTML={{ __html: contents }}
                onClick={handleSort}
                role="button"
                {...props}
              />
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default GalaxyTableHead;
