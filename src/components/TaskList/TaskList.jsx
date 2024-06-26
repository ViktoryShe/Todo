import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TaskList.css'

import Task from '../Task/Task'

export default class TaskList extends Component {
  render() {
    const { tasks, onDelete, onToggleCompleted, editItem } = this.props

    return (
      <ul className="todo-list">
        {tasks.map((task) => {
          const { id, ...itemProps } = task
          return (
            <Task
              key={id}
              id={id}
              {...itemProps}
              onDelete={() => onDelete(id)}
              onToggleCompleted={() => onToggleCompleted(id)}
              editItem={(value) => editItem(id, value)}
            />
          )
        })}
      </ul>
    )
  }
}

TaskList.defaultProps = {
  tasks: [],
  onDelete: () => {},
  onToggleCompleted: () => {},
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
  editItem: PropTypes.func.isRequired,
}
