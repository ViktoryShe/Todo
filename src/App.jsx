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
    ],
    filter: 'All',
    buttons: [
      { label: "All" },
      { label: "Active" },
      { label: "Completed" }
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

  deleteCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.completed)
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

  filterItems(items, filter) {
    switch(filter) {
      case 'All': 
        return items;
      case 'Active': 
        return items.filter((item) => !item.completed);
      case 'Completed': 
        return items.filter((item) => item.completed);
      default: 
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { tasks, filter, buttons } = this.state;
    return (
      <div className="todoapp">
      <NewTaskForm onItemAdd={this.addItem}/>
      <TaskList tasks={this.filterItems(tasks, filter)} 
      onDelete={this.deleteItem} 
      onToggleCompleted ={this.onToggleCompleted}/>
      <Footer onRemaining={tasks.filter((el) => !el.completed).length}
       filter={filter} 
       onFilterChange={this.onFilterChange} 
       buttons={buttons} 
       onDeleteCompleted={this.deleteCompleted}/>
    </div>
    );
  }
};


