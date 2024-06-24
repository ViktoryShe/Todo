import React from 'react'
import PropTypes from 'prop-types'
import './TaskList.css'

import Task from '../Task/Task'

const TaskList = ({ tasks, onDelete, onToggleCompleted, editItem, startTimer, stopTimer }) => {
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
            editItem={(value) => {
              if (typeof value !== 'string') {
                console.error(`Attempted to edit item with non-string text: ${value} (type: ${typeof value})`)
                return
              }
              editItem(id, value)
            }}
            startTimer={() => startTimer(id)}
            stopTimer={() => stopTimer(id)}
          />
        )
      })}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
}

export default TaskList
