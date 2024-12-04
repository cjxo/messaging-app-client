import { Link } from "react-router-dom";
import "./App.css";

import {
  SignIn, SignUp
} from "./components/AuthForm.jsx";

const App = () => {
  return (
    <div className="app">
      <nav>
        <h1 className="header-logo">Messaging App</h1>
      </nav>

      <main>
        <SignUp />
      </main>
    </div>
  );
};

export default App;
