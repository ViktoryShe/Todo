import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Task extends Component {
  state = {
    editing: false,
    value: this.props.label,
  };
  
  handleToggleEditing = () => {
    this.setState(prevState => ({
      editing: !prevState.editing,
    }));
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { editItem } = this.props;
    const { value } = this.state;
    editItem(value);
    this.setState({ editing: false });
  };
  
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { label, created, onDelete, onToggleCompleted, completed, formatTimeDifference } = this.props;
    const { editing, value } = this.state; 
    const listItemClasses = classNames({
      completed: completed,
      editing: editing,
    });

    return (
      <li className={listItemClasses} onClick={onToggleCompleted}>
        <div className='view'>
          <input className='toggle' type='checkbox'checked={completed} readOnly/>
          <label>
            <span className='description'>{label} </span>
            <span className='created'>{formatTimeDifference(created)}</span>
          </label>
          <button className='icon icon-edit' onClick={this.handleToggleEditing}></button>
          <button className='icon icon-destroy' onClick = {onDelete}></button>
        </div>
        {editing && (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="edit"
              value={value}
              onChange={this.handleChange}
              onBlur={this.handleSubmit}
            />
          </form>
        )}
      </li>
    );
  }
}

Task.defaultProps = {
  label: '',
  created: '',
  onDelete: () => {},
  onToggleCompleted: () => {},
  completed: false,
  formatTimeDifference: () => {},
  editItem:() => {}
};

Task.propTypes = {
  label: PropTypes.string,
  created: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  completed: PropTypes.bool,
  formatTimeDifference: PropTypes.func,
  id: PropTypes.number.isRequired,
  editItem: PropTypes.func.isRequired
};