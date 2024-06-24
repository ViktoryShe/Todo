import React, { useState, useEffect } from 'react'
import './App.css'

import TaskList from './components/TaskList/TaskList'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import Footer from './components/Footer/Footer'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const intervals = []

  useEffect(() => {
    return () => {
      intervals.forEach(clearInterval)
    }
  }, [])

  const startTimer = (id) => {
    setTasks((prevState) => {
      const updatedTaskData = prevState.map((task) => {
        if (task.id === id && !task.timerRunning) {
          const intervalId = setInterval(() => {
            setTasks((innerPrevState) => {
              const updatedData = innerPrevState.map((t) => {
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
              return updatedData
            })
          }, 1000)
          intervals.push(intervalId)
          return { ...task, timerRunning: true, intervalId }
        }
        return task
      })

      return updatedTaskData
    })
  }

  const stopTimer = (id) => {
    setTasks((prevState) => {
      const newArray = prevState.map((task) => {
        if (task.id === id && task.timerRunning) {
          clearInterval(task.intervalId)
          return { ...task, timerRunning: false, intervalId: null }
        }
        return task
      })
      return newArray
    })
  }

  const createTaskItem = (label, min, sec) => {
    const createdData = new Date()
    const id = Date.now()

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

  const addItem = (text, min, sec) => {
    setTasks((prevTasks) => [...prevTasks, createTaskItem(text, min, sec)])
  }

  const deleteItem = (id) => {
    setTasks((prevState) => {
      const updatedTasks = prevState.map((task) => {
        if (task.id === id && task.timerRunning) {
          clearInterval(task.intervalId)
          return { ...task, timerRunning: false, intervalId: null }
        }
        return task
      })
      return updatedTasks.filter((task) => task.id !== id)
    })
  }

  const deleteCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed))
  }

  const onToggleCompleted = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          }
        }
        return item
      })
    )
  }

  const editItem = (id, text) => {
    if (typeof text !== 'string') {
      console.error(`Label is not a string: ${text} (type: ${typeof text})`)
      return
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            label: text,
          }
        }
        return task
      })
    )
  }

  const filterItems = (items, filter) => {
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

  const onFilterChange = (filter) => {
    setFilter(filter)
  }

  return (
    <div className="todoapp">
      <NewTaskForm onItemAdd={addItem} />
      <TaskList
        tasks={filterItems(tasks, filter)}
        onDelete={deleteItem}
        onToggleCompleted={onToggleCompleted}
        editItem={editItem}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
      <Footer
        onRemaining={tasks.length}
        filter={filter}
        onFilterChange={onFilterChange}
        onDeleteCompleted={deleteCompleted}
      />
    </div>
  )
}

export default App
