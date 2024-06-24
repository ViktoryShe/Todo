import React from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

const TasksFilter = ({ filter = 'All', onFilterChange, buttons = [] }) => {
  return (
    <ul className="filters">
      {buttons.map(({ label }) => (
        <li key={label}>
          <button type="button" onClick={() => onFilterChange(label)} className={filter === label ? 'selected' : null}>
            {label}
          </button>
        </li>
      ))}
    </ul>
  )
}

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onFilterChange: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default TasksFilter
