import PropTypes from "prop-types";

const AuthForm = ({ type, fields }) => {
  return (
    <main className="auth-page-main">
      <section className="auth-section">
        <h2 className="form-title">{type} To <span>Messaging App</span></h2>
        <form className="auth-form">
          {fields.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
            />
          ))}
          <button>Submit</button>
        </form>
      </section>
    </main>
  );
};

const SignIn = () => {
  const signInFields = [
    { type: 'text', name: 'username', placeholder: 'Username' },
    { type: 'password', name: 'password', placeholder: 'Password' },
  ];

  return <AuthForm type="Sign In" fields={signInFields} />
};

const SignUp = () => {
  const signUpFields = [
    { type: 'text', name: 'first_name', placeholder: 'First Name' },
    { type: 'text', name: 'last_name', placeholder: 'Last Name' },
    { type: 'text', name: 'username', placeholder: 'Username' },
    { type: 'password', name: 'password', placeholder: 'Password' },
    { type: 'password', name: 'confirm_password', placeholder: 'Confirm Password' },
  ];

  return <AuthForm type="Sign Up" fields={signUpFields} />;
};

AuthForm.propTypes = {
  type: PropTypes.oneOf(["Sign In", "Sign Up"]).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.exact({
      type: PropTypes.oneOf(["text", "password"]).isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export {
  AuthForm,
  SignIn,
  SignUp,
};
