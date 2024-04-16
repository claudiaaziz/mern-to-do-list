const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRegisterInput = (data) => {
  const errors = {};

  // check the email field
  if (isEmpty(data.email)) {
    errors.email = 'Email field cannot be empty.';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid. Please provide a valid email.';
  }

  // check the name field
  if (isEmpty(data.name)) {
    errors.name = 'Name field cannot be empty.';
  } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.email = 'Name is invalid.';
  }

  // check the password field
  if (isEmpty(data.password)) {
    errors.password = 'Password must be at least 8 characters long.';
  } else if (!Validator.isLength(data.password, { min: 8, max: 150 })) {
    errors.password = 'Password must be between 8 and 150 characters long';
  }

  // check the confirmed password field
  if (
    isEmpty(data.confirmPassword) ||
    !Validator.equals(data.password, data.confirmPassword)
  ) {
    errors.confirmPassword = 'Password and Confirm Password must match.';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
