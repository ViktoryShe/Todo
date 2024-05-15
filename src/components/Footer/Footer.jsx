import React, { Component } from 'react';
import TasksFilter from './TasksFilter';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  render() {
    const { onRemaining, filter, onFilterChange, buttons, onDeleteCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count"> {onRemaining} items left</span>
        <TasksFilter  filter={filter} onFilterChange={onFilterChange} buttons={buttons}/>
        <button className="clear-completed" onClick={onDeleteCompleted}>Clear completed</button>
      </footer>
   );
  }
}
Footer.defaultProps = {
  buttons: [], 
  filter: 'All', 
  onDeleteCompleted: () => {},
  onFilterChange: () => {}
};

Footer.propTypes = {
  onRemaining: PropTypes.number.isRequired,
  filter: PropTypes.oneOf(["All", "Active", "Completed"]),  
  onDeleteCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};