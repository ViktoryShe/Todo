import React, { Component } from 'react';

export default class Task extends Component {

  render() {
    const { label, created, onDelete, onToggleCompleted, completed } = this.props;

    let classNames = "view";

    if (completed) {
      classNames += " completed"; 
    }

    return (
      <li className={classNames} onClick={onToggleCompleted}>
          <input className="toggle" type="checkbox"/>
          <label>
            <span className="description">{label} </span>
            <span className="created">{created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick = {onDelete}></button>
      </li>
    );
  }
}

