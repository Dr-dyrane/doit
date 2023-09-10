exports.handler = async (event, context) => {
    try {
      // Parse the request body to get the new task
      const newTask = JSON.parse(event.body);
  
      // Perform the add operation (you can replace this with your logic)
      // For example, add the new task to your data
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Task added successfully' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal server error' }),
      };
    }
  };
  