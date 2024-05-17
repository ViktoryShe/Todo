import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from './Task'

export default class TaskList extends Component {
  render() {
    const { tasks, onDelete, onToggleCompleted, formatTimeDifference, editItem } = this.props

    const taskItem = tasks.map((task) => {
      const { id, ...itemProps } = task
      return (
        <Task
          key={id}
          id={id}
          {...itemProps}
          onDelete={() => onDelete(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          formatTimeDifference={formatTimeDifference}
          editItem={(value) => editItem(id, value)}
        />
      )
    })

    return <ul className="todo-list">{taskItem}</ul>
  }
}

TaskList.defaultProps = {
  tasks: [],
  onDelete: () => {},
  onToggleCompleted: () => {},
  formatTimeDifference: () => {},
  editItem: () => {},
}

TaskList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.string.isRequired,
    })
  ).isRequired,
  formatTimeDifference: PropTypes.func,
  editItem: PropTypes.func.isRequired,
}
