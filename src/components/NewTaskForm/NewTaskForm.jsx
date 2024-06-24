import React, { useState } from 'react'
import './NewTaskForm.css'

const NewTaskForm = ({ onItemAdd }) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'label') setLabel(value)
    if (name === 'minutes') setMinutes(value)
    if (name === 'seconds') setSeconds(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onItemAdd(label, Number(minutes), Number(seconds))
    setLabel('')
    setMinutes('')
    setSeconds('')
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          className="new-todo"
          type="text"
          name="label"
          placeholder="What needs to be done?"
          autoFocus
          value={label}
          onChange={handleChange}
          required
          minLength="1"
        />
        <input
          className="new-todo-form__timer"
          type="text"
          name="minutes"
          placeholder="Min"
          value={minutes}
          onChange={handleChange}
          required
          pattern="^([0-9]|[1-5][0-9])$"
          min="0"
          max="59"
          title="Enter a valid number between 0 and 59"
        />
        <input
          className="new-todo-form__timer"
          type="text"
          name="seconds"
          placeholder="Sec"
          value={seconds}
          onChange={handleChange}
          required
          pattern="^([0-9]|[1-5][0-9])$"
          min="0"
          max="59"
          title="Enter a valid number between 0 and 59"
        />
        <button type="submit" style={{ display: 'none' }}>
          Add Task
        </button>
      </form>
    </header>
  )
}

export default NewTaskForm
