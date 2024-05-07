import React from 'react';
import TaskList from './components/TaskList/TaskList';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import Footer from './components/Footer/Footer';


const App = () => {
    const tasks = [
      { id: 1, description: "Completed task", created: "created 17 seconds ago" },
      { id: 2, description: "Editing task", created: "created 5 minutes ago" },
      { id: 3, description: "Active task", created: "created 5 minutes ago" }
      ];

    return (
        <div className="todoapp">
        <NewTaskForm />
        <TaskList tasks={tasks}/>
        <Footer />
      </div>
    );
  };

export default App;

