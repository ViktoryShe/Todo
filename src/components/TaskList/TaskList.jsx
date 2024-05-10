import React, { Component } from 'react';
import Task from './Task';

export default class TaskList extends Component {
  render() {
    const { tasks , onDelete } = this.props;

    const taskItem = tasks.map((task) => {
      const { id, ...itemProps } = task;
       return ( 
          <Task key={id} { ...itemProps } 
         onDelete = {() => onDelete(id)} />
      );
    });

    return (
      <ul className="todo-list">
      {taskItem}
      </ul>
    );
  };
}
