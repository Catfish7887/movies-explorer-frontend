class ApiError extends Error{
  constructor(message, statusCode){
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
};

export default ApiError;