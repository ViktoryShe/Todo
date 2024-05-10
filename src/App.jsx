import React, { Component } from 'react';
import TaskList from './components/TaskList/TaskList';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import Footer from './components/Footer/Footer';

export default class App extends Component {
  state = {
    tasks: [
      { id: 1, label: "Completed task", created: "created 17 seconds ago", completed: true },
      { id: 2, label: "Editing task", created: "created 5 minutes ago", completed: true },
      { id: 3, label: "Active task", created: "created 5 minutes ago", completed: true }
      ]
  };
  deleteItem = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== id)
    }));
  };

  render() {
    return (
      <div className="todoapp">
      <NewTaskForm />
      <TaskList tasks={this.state.tasks} onDelete={this.deleteItem}/>
      <Footer />
    </div>
    );
  }
};


