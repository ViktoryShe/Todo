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

  createTaskItem(label) {
    return {
      label,
      completed: false,
      editing: false,
      id: this.maxId++,
      created: new Date().toISOString(),
    }
  }

  addItem = (text) => {
    this.setState(({ tasks }) => ({
      tasks: [...tasks, this.createTaskItem(text)],
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
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
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
