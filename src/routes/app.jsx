import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <main className="main-app">
        <section className="side-bar">
          <h1 className="section-title">Messaging App</h1>    
          <ul>
            <li>
              <Link to="/users">
                Users
              </Link>
            </li>
            <li>
              <Link to="/chat">
                Chat
              </Link>
            </li>
            <li>
              <Link to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </section>
        <section className="main-display">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default App;
