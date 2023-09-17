# Doit

A simple to-do list application built with React.

## Table of Contents

- [Author](#author)
- [Description](#description)
- [Features](#features)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [Access](#Access)
- [License](#license)

## Author

- [Alexander Udeogaranya](https://github.com/Dr-dyrane)

## Description

Doit is a minimalist to-do list app that allows you to create and manage your tasks efficiently. It provides a clean and intuitive user interface, making it easy to stay organized and productive.

The code structure used classes to create structured components with defined behaviors, enhancing code organization and maintainability. Switch statements and try-catch-finally blocks are utilized for conditional routing and error handling, ensuring the app responds appropriately to different user interactions and potential issues, respectively.

Here's a summary of how different JavaScript features are used in the code:

1. **Classes**:
   - I've used classes to define my React components. For example, `App`, `Home`, and `Login` are implemented as classes extending `Component`.

2. **Switch Statements**:
   - In the `Signup` component, I've used a switch statement the to handle different scenarios based on the user's role. where i would implement different cases within the switch statement to perform specific actions or validations as needed for my application..
   - Remember 
   ```
   email - user@gmail.com
   password - password
   ```

3. **Try-Catch-Finally Statements**:
   - I've used try-catch blocks in the `Home` component to handle potential errors that might occur when interacting with Firebase for fetching, adding, updating, or deleting doits. This helps in gracefully handling errors and preventing crashes.

Now, let's explain how to use your application:

- The application consists of two main components: `Home` and `Login/Signup`.
- The initial state of `isLoggedIn` is `false`. If the user is not logged in, the `Login` component is rendered, where the user can enter a username and password.
- To log in, the user must enter the email "user@gmail.com" and the password "password" , if you do not widh to create an account for demo purposes. When this combination is entered, the `onLogin` function is called, setting the `isLoggedIn` state to `true`.
- If the user logs in successfully, the `Home` component is rendered. Here, you can add, check, uncheck, and delete "doits," which are tasks or to-do items.
- The application also uses firestore to persist the login status. So, if the user refreshes the page or returns later, they will remain logged in until they explicitly log out by clicking the "Logout" button in the footer.
- You can also create an demo account when you signup, no email validation needed yet, this would create a user with unique doits priviledge.

## Features

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Responsive design
- Data storage
- User Authentication

### Future features

1. **User Authentication:** Implement user accounts and authentication so users can save their to-do lists across sessions - In progress

2. **Task Prioritization:** Allow users to assign priorities (high, medium, low) to tasks and display them accordingly.

3. **Task Categories:** Add the ability to categorize tasks into different groups (e.g., work, personal, shopping).

4. **Search and Filter:** Implement a search feature to find tasks quickly and provide filtering options (e.g., show completed, show by category).

5. **Notifications:** Send reminders and notifications for upcoming tasks or deadlines.

6. **Due Dates:** Allow users to set due dates for tasks and show them in a calendar view.

7. **Notes and Descriptions:** Enable users to add notes or descriptions to tasks for more detailed information.

8. **Collaboration:** Add collaboration features to share tasks and to-do lists with others.

9. **Dark Mode:** Implement a dark mode for users who prefer a different color scheme.

10. **Data Visualization:** Provide charts or graphs to visualize task completion over time or by category.

11. **Performance Optimization:** Optimize the app's performance, especially if it becomes slow with a large number of tasks.

12. **Mobile Apps:** Consider creating mobile versions of your app for iOS and Android using frameworks like React Native or Flutter.

13. **Localization:** Add support for multiple languages to make your app accessible to a broader audience.

14. **Accessibility:** Ensure your app is accessible to people with disabilities by following accessibility guidelines.

15. **Data Backup:** Implement a backup and restore feature to prevent data loss.

16. **Offline Mode:** Make the app functional even when the user is offline, with data synchronization when they reconnect.

17. **Task Sharing:** Allow users to share tasks or to-do lists via email, SMS, or social media.

18. **Task Reordering:** Enable users to reorder tasks manually or by priority.

19. **Data Export:** Provide options for users to export their task data in various formats (e.g., CSV, JSON).

20. **Gamification:** Add game-like elements to motivate users to complete tasks and achieve goals.

## Technologies Used

- React
- Vite
- React Spring
- Tailwind CSS
- Firebase

## Getting Started

To get started with Doit, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Dr-dyrane/doit.git
   ```

2. Install dependencies:

   ```bash
   cd doit
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. Open the Doit application in your browser.
2. Enter a task in the input field and click the "Add" button to add it to the to-do list.
3. To mark a task as completed, click the checkbox next to it.
4. To delete a task, click the "Delete" button next to it.
5. Stay organized and track your tasks effectively!

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to open an issue or submit a pull request.

## Access

You can access the Doit application by visiting the following URL:

Primary domain
[Doit - To-Do List App](https://doit.dr-dyrane.tech)

Netlify Subdomain
[Doit - To-Do List App](https://doit-by-dyrane.netlify.app)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
