import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Task.css'
import { formatTimeDifference } from '../../utils'

export default class Task extends Component {
  state = {
    editing: false,
    value: this.props.label,
  }

  handleToggleEditing = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { editItem } = this.props
    const { value } = this.state
    editItem(this.props.id, value)
    this.setState({ editing: false })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handlePlayTimer = (e) => {
    e.stopPropagation()
    const { id, startTimer } = this.props
    startTimer(id)
  }

  handleStopTimer = (e) => {
    e.stopPropagation()
    const { id, stopTimer } = this.props
    stopTimer(id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.label !== this.props.label) {
      this.setState({ value: this.props.label })
    }
  }

  render() {
    const { label, created, onDelete, onToggleCompleted, completed, min, sec } = this.props
    const { editing, value } = this.state
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
              <button className="icon icon-play" onClick={this.handlePlayTimer}></button>
              <button className="icon icon-pause" onClick={this.handleStopTimer}></button>
              <span className="timer">
                {min}:{sec}
              </span>
            </span>
            <span className="created description">{timeDifference}</span>
          </label>
          <button className="icon icon-edit" onClick={this.handleToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        {editing && (
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="edit" value={value} onChange={this.handleChange} onBlur={this.handleSubmit} />
          </form>
        )}
      </li>
    )
  }
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
