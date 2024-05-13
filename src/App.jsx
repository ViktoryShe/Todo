import React, { Component } from 'react';
import TaskList from './components/TaskList/TaskList';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import Footer from './components/Footer/Footer';

export default class App extends Component {
  maxId = 100;
  state = {
    tasks: [
      this.createTaskItem("Completed task"),
      this.createTaskItem("Editing task"),
      this.createTaskItem("Active task")
      ]
  };

  createTaskItem(label) {
    return {
      label,
      completed: false,
      id: this.maxId++,
    };
  };

  addItem = (text) => {
    this.setState(({ tasks }) => ({
      tasks: [...tasks, this.createTaskItem(text)]
    }));
  };

  deleteItem = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id)
    }));
  };

  toggleProperty(arr, id, propName) {
    return arr.map(item => (item.id === id ? { ...item, [propName]: !item[propName] } : item));
  }

  onToggleCompleted = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.toggleProperty(tasks, id, 'completed')
    }));
  };

  render() {
    const { tasks } = this.state;
    return (
      <div className="todoapp">
      <NewTaskForm onItemAdd={this.addItem}/>
      <TaskList tasks={tasks} onDelete={this.deleteItem} onToggleCompleted ={this.onToggleCompleted}/>
      <Footer onRemaining={tasks.filter((el) => !el.completed).length}/>
    </div>
    );
  }
};


