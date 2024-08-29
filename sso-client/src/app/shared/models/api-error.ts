export class ApiError<T> extends Error {
  data: T;

  /**
   * Constructs an instance of the ApiError class.
   *
   * @param {string} message - The error message.
   * @param {T} errorData - The error data associated with this error.
   */
  constructor(message: string, errorData: T) {
    super(message);  // Call the parent class (Error) constructor
    this.name = 'ApiError';  // Set the error name to 'ApiError'
    this.data = errorData;  // Assign the error data

    // Ensure the name of this error is the same as the class name
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Retrieves the error data.
   *
   * @returns {T} The error data associated with this error.
   */
  getErrorData(): T {
    return this.data;  // Return the error data
  }
}
