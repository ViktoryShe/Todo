import React, { Component } from 'react';
import Task from './Task';
import PropTypes from 'prop-types';

export default class TaskList extends Component {
  render() {
    const { tasks , onDelete , onToggleCompleted} = this.props;

    const taskItem = tasks.map((task) => {
      const { id, ...itemProps } = task;
       return ( 
          <Task key={id} { ...itemProps } 
         onDelete = {() => onDelete(id)} 
         onToggleCompleted = {() => onToggleCompleted(id)}/>
      );
    });

    return (
      <ul className="todo-list">
      {taskItem}
      </ul>
    );
  };
}

TaskList.defaultProps = {
  tasks: [],
  onDelete: () => {},
  onToggleCompleted: () => {}
};

Task.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
};