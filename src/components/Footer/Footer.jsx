import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Footer.css'

import TasksFilter from '../TasksFilter/TasksFilter'

const FILTER_BUTTONS = [{ label: 'All' }, { label: 'Active' }, { label: 'Completed' }]

export default class Footer extends Component {
  render() {
    const { onRemaining, filter, onFilterChange, onDeleteCompleted } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{onRemaining} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} buttons={FILTER_BUTTONS} />
        <button className="clear-completed" onClick={onDeleteCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.defaultProps = {
  filter: 'All',
  onDeleteCompleted: () => {},
  onFilterChange: () => {},
}

Footer.propTypes = {
  onRemaining: PropTypes.number.isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onDeleteCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
}
