import { useState } from "react";
import PropTypes from "prop-types";
import api from "../api/api";

const AuthForm = ({ type, fields, handleSubmit, errMsg }) => {
  return (
    <main className="auth-page-main">
      <section className="auth-section">
        <h2 className="form-title">{type} To <span>Messaging App</span></h2>
        {
          errMsg ? (
            <p className="error-message">{errMsg}</p>
          ) : (
            null
          )
        }
        <form
          className="auth-form"
          onSubmit={handleSubmit}
          method="POST"
        >
          {fields.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required
            />
          ))}
          <button>Submit</button>
        </form>
      </section>
    </main>
  );
};

const SignIn = () => {
  const [errMsg, setErrMsg] = useState("");
  const signInFields = [
    { type: 'text', name: 'username', placeholder: 'Username' },
    { type: 'password', name: 'password', placeholder: 'Password' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const username = fd.get("username");
    const password = fd.get("password");

    api
      .auth
      .signIn(username, password)
      .then(result => {
        if (!result.ok) {
          setErrMsg(result.message);
          return;
        }

        console.log(result.message);
        setErrMsg("");
      });
  };
  return <AuthForm type="Sign In" fields={signInFields} errMsg={errMsg} handleSubmit={handleSubmit} />
};

const SignUp = () => {
  const [errMsg, setErrMsg] = useState("");
  const signUpFields = [
    { type: 'text', name: 'first_name', placeholder: 'First Name' },
    { type: 'text', name: 'last_name', placeholder: 'Last Name' },
    { type: 'text', name: 'username', placeholder: 'Username' },
    { type: 'email', name: 'email', placeholder: 'Email' },
    { type: 'password', name: 'password', placeholder: 'Password' },
    { type: 'password', name: 'confirm_password', placeholder: 'Confirm Password' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const firstName = fd.get("first_name");
    const lastName = fd.get("last_name");
    const username = fd.get("username");
    const email = fd.get("email");
    const password = fd.get("password");
    const confirmPassword = fd.get("confirm_password");

    if (password.length <= 8) {
      setErrMsg("Password length must be more than 8");
      return;
    }

    if (password != confirmPassword) {
      setErrMsg("Passwords do not match");
      return;
    }

    api
      .auth
      .signUp(firstName, lastName, username, email, password)
      .then(result => {
        if (!result.ok) {
          setErrMsg(result.message);
          return;
        }

        console.log(result.message);
        setErrMsg("");
      });
  };

  return <AuthForm
            type="Sign Up"
            fields={signUpFields}
            handleSubmit={handleSubmit}
            errMsg={errMsg}
          />;
};

AuthForm.propTypes = {
  type: PropTypes.oneOf(["Sign In", "Sign Up"]).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.exact({
      type: PropTypes.oneOf(["text", "password", "email"]).isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  errMsg: PropTypes.string.isRequired,
}

export {
  AuthForm,
  SignIn,
  SignUp,
};
