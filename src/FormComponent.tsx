import React, { useState } from "react";
import './FormComponent.css'; // Import CSS for styles
import epicLogo from './assets/epic_games.png'; // Import the PNG image

interface FormValues {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
}

const FormComponent: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    let errors: FormErrors = {};
    let valid = true;

    if (!formValues.firstName || formValues.firstName.length < 5) {
      errors.firstName = "First Name must be at least 5 characters long";
      valid = false;
    }

    if (!formValues.lastName || formValues.lastName.length < 5) {
      errors.lastName = "Last Name must be at least 5 characters long";
      valid = false;
    }

    if (!formValues.password) {
      errors.password = "Password cannot be empty";
      valid = false;
    }

    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setFormErrors(errors);
    setIsFormValid(valid);

    // If valid, log the user in
    if (valid) {
      setIsLoggedIn(true); // Set the user as logged in
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set the user as logged out
    setFormValues({
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    }); // Reset the form fields
    setFormErrors({});
    setIsFormValid(false);
  };

  // If the user is logged in, show the success page
  if (isLoggedIn) {
    return (
        <div className="success-container">
          <h2>Welcome, {formValues.firstName}!</h2>
          <p>You have successfully logged in.</p>
          {/* Rotating EpicLogo */}
          <div className="rotating-image">
          <img src={epicLogo} alt="Epic Games Logo" className="logo rotating" />
        </div>
          {/* Logout button */}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
  }

  // Otherwise, show the login form
  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Sign In</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-box">
        <div className="input-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formValues.firstName}
            onChange={handleChange}
            className={formErrors.firstName ? "invalid" : ""}
          />
          {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formValues.lastName}
            onChange={handleChange}
            className={formErrors.lastName ? "invalid" : ""}
          />
          {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
            className={formErrors.password ? "invalid" : ""}
          />
          {formErrors.password && <span className="error">{formErrors.password}</span>}
        </div>
        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            className={formErrors.confirmPassword ? "invalid" : ""}
          />
          {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
        </div>
        <button type="submit">Sign In</button>
      </form>
      {isFormValid && <p className="valid-feedback">Form is valid!</p>}
    </div>
  );
};

export default FormComponent;
