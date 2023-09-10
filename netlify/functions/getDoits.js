// netlify/functions/getDoits.js

exports.handler = async (event, context) => {
    try {
      const doits = [
        { id: '1', title: 'Sample Task 1', completed: false },
        { id: '2', title: 'Sample Task 2', completed: true },
      ];
  
      return {
        statusCode: 200,
        body: JSON.stringify(doits),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal server error' }),
      };
    }
  };  