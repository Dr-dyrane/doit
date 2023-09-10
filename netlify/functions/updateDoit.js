exports.handler = async (event, context) => {
    try {
      // Parse the request body to get the updated task
      const updatedTask = JSON.parse(event.body);
  
      // Perform the update operation (you can replace this with your logic)
      // For example, update the task with the given ID with the new data
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Task updated successfully' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal server error' }),
      };
    }
  };
  