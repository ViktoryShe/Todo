import React, { Component } from 'react';

export default class Task extends Component {
  state = {
    completed: false
  };
  onMarkImportant = () => {
    this.setState(({ completed }) => {
      return {
        completed: !completed,
      };
    });
  };
  render() {
    const { label, created , onDelete } = this.props;
    const { completed } = this.state;

    let classNames = "view";

    if (completed) {
      classNames += " completed";
    }

    return (
      <li className={classNames} onClick={this.onMarkImportant}>
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

