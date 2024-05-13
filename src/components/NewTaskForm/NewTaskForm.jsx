import React, { Component } from 'react';

export default class NewTaskForm extends Component  {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({label: e.target.value});
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    if (label.trim()) { 
      this.props.onItemAdd(label);
      this.setState({ label: "" }); 
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input className="new-todo" 
        placeholder="What needs to be done?" autoFocus 
        onChange={this.onLabelChange} value={this.state.label}/>
        </form>
      </header>
    );
  };
};
