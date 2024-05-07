import React from 'react';
import Task from './Task';

const TaskList = ({tasks}) => {
  const taskItem = tasks.map((task) => {
    const { id, ...itemProps } = task;
   return ( 
   <li key={id} className="completed">
      <Task { ...itemProps } />
    </li>
   );
});

    return (
     <section className="main">
      <ul className="todo-list">
      {taskItem}
      </ul>
      </section>
    );
  };

export default TaskList;