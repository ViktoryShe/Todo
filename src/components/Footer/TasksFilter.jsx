import React, { Component } from 'react';

export default class TasksFilter extends Component {
  render() {
    const { filter, onFilterChange, buttons} = this.props;

    return (
      <ul className="filters">
          {buttons.map(({ label }) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => onFilterChange(label)}
              className={filter === label ? "selected" : null}>
              {label}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
