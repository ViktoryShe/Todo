import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Task.css'
import { formatTimeDifference } from '../../utils'

const Task = ({
  id,
  label,
  created,
  onDelete,
  onToggleCompleted,
  completed,
  min,
  sec,
  editItem,
  startTimer,
  stopTimer,
}) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(label)

  useEffect(() => {
    setValue(label)
  }, [label])

  const handleToggleEditing = () => {
    setEditing(!editing)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (typeof value !== 'string') {
      console.error(`Attempted to submit non-string text: ${value} (type: ${typeof value})`)
      return
    }
    editItem(value)
    setEditing(false)
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handlePlayTimer = (e) => {
    e.stopPropagation()
    startTimer(id)
  }

  const handleStopTimer = (e) => {
    e.stopPropagation()
    stopTimer(id)
  }

  const timeDifference = formatTimeDifference(created)
  const listItemClasses = classNames({
    completed: completed,
    editing: editing,
  })

  return (
    <li className={listItemClasses} onClick={onToggleCompleted}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} readOnly />
        <label>
          <span className="description">{label} </span>
          <span className="description">
            <button className="icon icon-play" onClick={handlePlayTimer}></button>
            <button className="icon icon-pause" onClick={handleStopTimer}></button>
            <span className="timer">
              {min}:{sec}
            </span>
          </span>
          <span className="created description">{timeDifference}</span>
        </label>
        <button className="icon icon-edit" onClick={handleToggleEditing}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {editing && (
        <form onSubmit={handleSubmit}>
          <input type="text" className="edit" value={value} onChange={handleChange} onBlur={handleSubmit} />
        </form>
      )}
    </li>
  )
}

Task.defaultProps = {
  label: '',
  created: '',
  onDelete: () => {},
  onToggleCompleted: () => {},
  completed: false,
  editItem: () => {},
  startTimer: () => {},
  stopTimer: () => {},
}

Task.propTypes = {
  label: PropTypes.string,
  created: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool,
  id: PropTypes.number.isRequired,
  editItem: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
}

export default Task
