import React, { Component } from "react";
import { MdRemove } from "react-icons/md";

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
      <li className="flex shadow-md bg-slate-400/20 hover:bg-slate-200/50 items-center mb-4 justify-between p-4 rounded-xl">
        <label className="flex items-center text-black">
          <div className="grid justify-items-stretch text-xl font-black">
            <input
              type="checkbox"
              checked={doit.completed}
              onChange={() => handleCheck(doit.id)}
              className="rounded-full justify-self-centerr appearance-none h-6 w-6 border border-gray-900 hover:bg-purple-500 hover:border-transparent checked:bg-purple-600 checked:border-transparent"
            />
          </div>
          <div
            className={`ml-2 whitespace-no-wrap overflow-hidden lg:max-w-[150px] xl:max-w-[200px] ${
              doit.completed ? "line-through text-back" : ""
            }`}
            ref={this.titleRef} // Attach the ref to the title element
          >
            {doit.title}
          </div>
        </label>
        <button
          type="button"
          onClick={() => handleDelete(doit.id)}
          className="border border-red-600 text-xl text-red-600 hover:bg-red-700 hover:text-white px-1 py-1 rounded-full"
        >
          <MdRemove size={20} />
        </button>
      </li>
    );
  }
}

export default DoitItem;