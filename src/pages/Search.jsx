import React, { Component } from "react";
import { MdArrowBackIosNew, MdMic, MdMoreVert } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import the Link component

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
		};
	}

	toggleExpand = () => {
		this.setState((prevState) => ({
			isExpanded: !prevState.isExpanded,
		}));
	};

	render() {
		const { isExpanded } = this.state;

		return (
			<div className="flex flex-col h-screen bg-slate-300">
				{/* Top Section */}
				<div className="flex items-center text-purple-700 justify-between p-4">
					{/* Back Arrow */}
					<Link to="/">
						<button className="p-2 rounded-full hover:bg-slate-200 focus:outline-none">
							<MdArrowBackIosNew size={24} />
						</button>
					</Link>

					{/* Search Input */}
					<input
						type="text"
						className="flex-grow p-2 bg-transparent border-none focus:outline-none"
						placeholder="Search"
						autoFocus
					/>

					{/* Microphone Icon */}
					<button className="p-2 rounded-full hover:bg-slate-200 focus:outline-none">
						<MdMic size={24} />
					</button>

					{/* More Button */}
					<button className="p-2 rounded-full hover:bg-slate-200 focus:outline-none">
						<MdMoreVert size={24} />
					</button>
				</div>

				{/* Filter Section */}
				<div className="relative p-2">
					<button
						className={`flex w-full items-center justify-between px-8 p-1 focus:outline-none ${
							isExpanded
								? "bg-slate-400/50 rounded-t-xl"
								: "bg-slate-400/50 rounded-xl"
						}`}						onClick={this.toggleExpand}
					>
						{/* Filter Text */}
						<span className="text-xs font-semibold">Filters</span>

						{/* Expand/Collapse Button */}
						<span className="p-2 hover:bg-slate-200/80 rounded-full focus:outline-none">
							{/* Add an arrow icon (up or down) based on the expand/collapse state */}
							<FaAngleDown
								size={14}
								style={{
									transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
								}}
							/>
						</span>
					</button>

					{/* Filters Dropdown */}
					{isExpanded && (
						<div className="absolute text-xs font-medium flex bg-slate-400/50 px-4 left-2 right-2 bg-white rounded-b-xl shadow-md">
							<div className="p-2 m-1 border hover:bg-slate-300/80 border-black rounded-2xl">
								<label className="items-center">
									<span className="">Completed</span>
								</label>
							</div>
							<div className="p-2 m-1 border hover:bg-slate-300/80 border-black rounded-2xl">
								<label className="items-center">
									<span className="">Not Completed</span>
								</label>
							</div>
							{/* Add more filter options here */}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Search;
