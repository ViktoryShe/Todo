import React from 'react';
import TasksFilter from './TasksFilter';

const Footer = ({onRemaining}) => {
    return (
      <footer className="footer">
        <span className="todo-count"> {onRemaining} items left</span>
        <TasksFilter />
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  };

export default Footer;