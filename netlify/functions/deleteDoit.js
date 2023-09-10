exports.handler = async (event, context) => {
    try {
      // Parse the request body to get the ID of the task to delete
      const { id } = JSON.parse(event.body);
  
      // Perform the deletion operation (you can replace this with your logic)
      // For example, remove the task with the given ID from your data
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Task deleted successfully' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal server error' }),
      };
    }
  };
  