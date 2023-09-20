import React, { Component } from "react";

/**
 * Component representing a to-do item.
 */
class DoitItem extends Component {
  constructor(props) {
    super(props);
    // Create a ref to access the title element
    this.titleRef = React.createRef();
  }

  componentDidMount() {
    this.checkOverflow();
  }

  componentDidUpdate() {
    this.checkOverflow();
  }

  /**
   * Check if the title text overflows its container and apply a class accordingly.
   */
  checkOverflow() {
    const titleElement = this.titleRef.current;
    if (titleElement) {
      // Use a switch statement to determine the class to apply
      switch (true) {
        case titleElement.scrollWidth > titleElement.clientWidth:
          // If overflow, add the marquee-scroll class
          titleElement.classList.add("marquee-scroll");
          break;
        default:
          // If no overflow, remove the marquee-scroll class
          titleElement.classList.remove("marquee-scroll");
          break;
      }
    }
  }

  render() {
    const { doit, handleCheck, handleDelete } = this.props;
    return (
      <li className="flex items-center mb-2 justify-between">
        <label className="flex items-center text-white">
          <div>
            <input
              type="checkbox"
              checked={doit.completed}
              onChange={() => handleCheck(doit.id)}
              className="rounded appearance-none h-4 w-4 border border-gray-300 checked:bg-purple-500 checked:border-transparent"
            />
          </div>
          <div
            className={`ml-2 whitespace-no-wrap overflow-hidden lg:max-w-[150px] xl:max-w-[200px] ${
              doit.completed ? "line-through text-white" : ""
            }`}
            ref={this.titleRef} // Attach the ref to the title element
          >
            {doit.title}
          </div>
        </label>
        <button
          type="button"
          onClick={() => handleDelete(doit.id)}
          className="bg-transparent border border-red-500 text-red-500 hover:bg-red-700 hover:text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </li>
    );
  }
}

export default DoitItem;