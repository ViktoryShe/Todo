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
    this.intervals = []
  }

  startTimer = (id) => {
    this.setState((prevState) => {
      const updatedTaskData = prevState.tasks.map((task) => {
        if (task.id === id && !task.timerRunning) {
          const intervalId = setInterval(() => {
            this.setState((innerPrevState) => {
              const updatedData = innerPrevState.tasks.map((t) => {
                if (t.id === id) {
                  if (t.sec > 0) {
                    return { ...t, sec: t.sec - 1 }
                  } else if (t.min > 0) {
                    return { ...t, sec: 59, min: t.min - 1 }
                  } else {
                    clearInterval(t.intervalId)
                    return { ...t, timerRunning: false, intervalId: null }
                  }
                }
                return t
              })
              return { tasks: updatedData }
            })
          }, 1000)
          this.intervals.push(intervalId)
          return { ...task, timerRunning: true, intervalId }
        }
        return task
      })

      return { tasks: updatedTaskData }
    })
  }

  stopTimer = (id) => {
    this.setState((prevState) => {
      const newArray = prevState.tasks.map((task) => {
        if (task.id === id && task.timerRunning) {
          clearInterval(task.intervalId)
          return { ...task, timerRunning: false, intervalId: null }
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
    this.intervals.forEach(clearInterval)
  }

  addItem = (text, min, sec) => {
    this.setState(({ tasks }) => ({
      tasks: [...tasks, this.createTaskItem(text, min, sec)],
    }))
  }

  deleteItem = (id) => {
    this.setState(
      (prevState) => {
        const updatedTasks = prevState.tasks.map((task) => {
          if (task.id === id && task.timerRunning) {
            clearInterval(task.intervalId)
            console.log(`Timer stopped for task with id ${id}`)
            return { ...task, timerRunning: false, intervalId: null }
          }
          return task
        })
        return {
          tasks: updatedTasks.filter((task) => task.id !== id),
        }
      },
      () => {
        console.log(`Task with id ${id} deleted`)
      }
    )
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
      console.error(`Label is not a string: ${text} (type: ${typeof text})`)
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
