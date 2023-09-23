import React, { Component } from "react";
import { AuthContext } from "../hooks/AuthProvider";
import { MdMoreVert } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom"; // Import the Link component

class UserProfile extends Component {
	render() {
		const defaultUserImage =
			"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"; // Set the default user image path here

		return (
			<AuthContext.Consumer>
				{(context) => (
					<div className="flex items-center justify-between mb-4 rounded-lg">
						{/* Left: User Profile Picture */}
						<div
							className="w-10 h-10 bg-slate-200 border hover:opacity-60 border-purple-500 rounded-full overflow-hidden cursor-pointer"
							onClick={() => {
								const shouldLogout = window.confirm(
									"Are you sure you want to log out?"
								);
								if (shouldLogout) {
									context.handleLogout();
								}
								// Handle the click event to open the user profile modal or page
								// Example: You can set a state to control the modal visibility
								// this.setState({ isUserProfileModalOpen: true });
							}}
						>
							<img
								src={
									context.user
										? context.user.photoURL || defaultUserImage
										: defaultUserImage
								}
								alt="U"
								className="w-full h-full object-cover"
							/>
						</div>

						{/* Right: Search and More Buttons */}
						<div className="flex space-x-0 bg-transparent text-purple-600">
							{/* Search Button */}
							<Link to="/search">
								<button className="p-2 rounded-full hover:bg-slate-200 focus:outline-none">
									<BsSearch size={24} />
								</button>
							</Link>

							{/* More Button */}
							<button className="p-2 rounded-full hover:bg-slate-200 focus:outline-none">
								<MdMoreVert size={28} />
							</button>
						</div>
					</div>
				)}
			</AuthContext.Consumer>
		);
	}
}

export default UserProfile;
