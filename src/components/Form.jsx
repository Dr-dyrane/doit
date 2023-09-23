import React, { Component } from "react";
import { MdAdd, MdCheck } from "react-icons/md";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      hasText: false,
      isFocused: false, // Track input focus state
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newItem.trim() !== "") {
      this.props.addDoit(this.state.newItem);
      this.setState({ newItem: "", hasText: false });
    }
  };

  handleChange = (e) => {
    const newItem = e.target.value;
    this.setState({ newItem, hasText: newItem.trim() !== "" });
  };

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const { hasText, isFocused } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="w-full">
        <div className="flex items-center justify-between">
          <input
            type="text"
            id="item"
            placeholder="Add a task"
            value={this.state.newItem}
            onChange={this.handleChange}
            onFocus={this.handleFocus} // Handle input focus
            onBlur={this.handleBlur}   // Handle input blur
            className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-3 rounded-3xl dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className={`bg-transparent hover:text-white ml-4 inline-flex border ${
              hasText ? "bg-purple-600 text-white" : "border-purple-600 text-purple-600"
            } px-4 py-4 rounded-full hover:bg-purple-500 transition-colors duration-300`}
          >
            {(hasText || isFocused) ? <MdCheck size={28} /> : <MdAdd size={28} />}
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
