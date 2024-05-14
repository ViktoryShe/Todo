import React, { Component } from 'react';

export default class Task extends Component {

  render() {
    const { label, created, onDelete, onToggleCompleted, completed } = this.props;

    let classNames = "";

    if (completed) {
      classNames += "completed"; 
    }

    return (
      <li className={classNames} onClick={onToggleCompleted}>
        <div className="view">
          <input className="toggle" type="checkbox"checked={completed} readOnly/>
          <label>
            <span className="description">{label} </span>
            <span className="created">{created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick = {onDelete}></button>
        </div>
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
};
