import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newItem.trim() !== "") {
      this.props.addDoit(this.state.newItem);
      this.setState({ newItem: "" });
    }
  };

  handleChange = (e) => {
    this.setState({ newItem: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="w-full">
        <div className="flex items-center justify-between">
          <input
            type="text"
            id="item"
            placeholder="add a task"
            value={this.state.newItem}
            onChange={this.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 rounded-l-lg dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-transparent inline-flex border border-purple-600 text-purple-600 px-4 py-2 rounded-r-lg hover:bg-purple-500 hover:text-white transition-colors duration-300"
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

export default Form;