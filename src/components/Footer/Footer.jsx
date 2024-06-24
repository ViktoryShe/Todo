import React from 'react'
import PropTypes from 'prop-types'

import './Footer.css'
import TasksFilter from '../TasksFilter/TasksFilter'

const FILTER_BUTTONS = [{ label: 'All' }, { label: 'Active' }, { label: 'Completed' }]

const Footer = ({ onRemaining, filter = 'All', onFilterChange = () => {}, onDeleteCompleted = () => {} }) => (
  <footer className="footer">
    <span className="todo-count">{onRemaining} items left</span>
    <TasksFilter filter={filter} onFilterChange={onFilterChange} buttons={FILTER_BUTTONS} />
    <button className="clear-completed" onClick={onDeleteCompleted}>
      Clear completed
    </button>
  </footer>
)

Footer.propTypes = {
  onRemaining: PropTypes.number.isRequired,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onDeleteCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
}

export default Footer
