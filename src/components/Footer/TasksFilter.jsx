import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  render() {
    const { filter, onFilterChange, buttons } = this.props; 

    return (
      <ul className='filters'>
        {buttons.map(({ label }) => (
          <li key={label}>
            <button
              type='button'
              onClick={() => onFilterChange(label)}
              className={filter === label ? 'selected' : null}>
              {label}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

TasksFilter.defaultProps = {
  buttons: [], 
  filter: 'All',
  onFilterChange: () => {}
};

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']), 
  onFilterChange: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};