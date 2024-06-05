import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { label, minutes, seconds } = this.state

    if (!label.trim() || !minutes.trim() || !seconds.trim()) {
      alert('Please fill out all fields.')
      return
    }

    if (isNaN(minutes) || isNaN(seconds)) {
      alert('Minutes and seconds must be numbers.')
      return
    }

    if (minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
      alert('Minutes and seconds must be between 0 and 59.')
      return
    }

    this.props.onItemAdd(label, Number(minutes), Number(seconds))

    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    })
  }

  render() {
    const { label, minutes, seconds } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            type="text"
            name="label"
            placeholder="What needs to be done?"
            autoFocus
            value={label}
            onChange={this.handleChange}
            required
          />
          <input
            className="new-todo-form__timer"
            type="text"
            name="minutes"
            placeholder="Min"
            value={minutes}
            onChange={this.handleChange}
            required
          />
          <input
            className="new-todo-form__timer"
            type="text"
            name="seconds"
            placeholder="Sec"
            value={seconds}
            onChange={this.handleChange}
            required
          />
          <button type="submit" style={{ display: 'none' }}>
            Add Task
          </button>
        </form>
      </header>
    )
  }
}
