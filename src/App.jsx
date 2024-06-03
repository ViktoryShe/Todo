import React, { Component } from 'react'
import './App.css'

import TaskList from './components/TaskList/TaskList'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import Footer from './components/Footer/Footer'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.maxId = 100
    this.state = {
      tasks: [],
      filter: 'All',
    }
  }

  startTimer = (id) => {
    this.setState((prevState) => {
      const updatedTaskData = prevState.tasks.map((task) => {
        if (task.id === id && !task.timerRunning) {
          const intervalId = setInterval(() => {
            this.setState((prevState) => {
              const updatedData = prevState.tasks.map((t) => {
                if (t.id === id) {
                  if (t.sec > 0) {
                    t.sec -= 1
                  } else if (t.min > 0) {
                    t.sec = 59
                    t.min -= 1
                  } else {
                    clearInterval(task.intervalId)
                    t.timerRunning = false
                  }
                }
                return t
              })
              return { tasks: updatedData }
            })
          }, 1000)

          return { ...task, timerRunning: true, intervalId }
        }
        return task
      })

      return { tasks: updatedTaskData }
    })
  }

  stopTimer = (id) => {
    this.setState(({ tasks }) => {
      const newArray = tasks.map((task) => {
        if (task.id === id && task.timerRunning) {
          clearInterval(task.intervalId)
          task.timerRunning = false
        }
        return task
      })
      return { tasks: newArray }
    })
  }

  createTaskItem(label, min, sec) {
    const createdData = new Date()
    const id = this.maxId++

    return {
      id,
      label,
      min,
      sec,
      createdData,
      editing: false,
      completed: false,
      created: new Date().toISOString(),
      timerRunning: false,
      intervalId: null,
    }
  }

  componentWillUnmount() {
    const { tasks } = this.state
    tasks.forEach((task) => {
      if (task.timerRunning) {
        clearInterval(task.intervalId)
      }
    })
  }

  addItem = (text, min, sec) => {
    this.setState(({ tasks }) => ({
      tasks: [...tasks, this.createTaskItem(text, min, sec)],
    }))
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id),
    }))
  }

  deleteCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed),
    }))
  }

  onToggleCompleted = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          }
        }
        return item
      }),
    }))
  }

  editItem = (id, text) => {
    if (typeof text !== 'string') {
      console.error('Label is not a string:', text)
      return
    }
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            label: text,
          }
        }
        return task
      }),
    }))
  }

  filterItems = (items, filter) => {
    if (filter === 'All') {
      return items
    } else if (filter === 'Active') {
      return items.filter((item) => !item.completed)
    } else if (filter === 'Completed') {
      return items.filter((item) => item.completed)
    } else {
      return items
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  render() {
    const { tasks, filter } = this.state
    return (
      <div className="todoapp">
        <NewTaskForm onItemAdd={this.addItem} />
        <TaskList
          tasks={this.filterItems(tasks, filter)}
          onDelete={this.deleteItem}
          onToggleCompleted={this.onToggleCompleted}
          editItem={this.editItem}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
        />
        <Footer
          onRemaining={tasks.filter((el) => !el.completed).length}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onDeleteCompleted={this.deleteCompleted}
        />
      </div>
    )
  }
}
