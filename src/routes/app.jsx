import { Link, Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  mdiAccountGroupOutline,
  mdiAccountGroup,
  mdiChatOutline,
  mdiChat,
  mdiAccount,
  mdiAccountOutline,
  mdiLogout,
} from '@mdi/js';
import Icon from '@mdi/react';
import { useAuth } from "../hooks/Auth";

const SidebarLi = ({ mdi, mdiO, title, to, selected }) => {
  const [hover, setHover] = useState(false);
  const colour = selected || hover ? "#445ad1" : "black";
  return (
    <li>
      <Link
        to={to}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Icon
          path={selected || hover ? mdi : mdiO}
          title={title}
          size={1.5}
          color={colour}
        />
        <p style={{color: colour }}>{title}</p>
      </Link>
    </li>
  );
};

const App = () => {
  const [signOutHover, setSignOutHover] = useState(false);

  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (auth.isLoading) {
    return <div>Loading...</div>
  }

  if (!auth.isAuth) {
    return <Navigate to="/sign-in" />;
  }

  const handleSignOut = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  let path;
  const slashIdx = location.pathname.substring(1, location.pathname.length).indexOf("/");
  if (slashIdx === -1) {
    path = location.pathname;
  } else {
    location.pathname.substring(0, path + 1);
  }

  return (
    <div className="app">
      <main className="main-app">
        <section className="side-bar">
          <div className="logo">
            <img
              src="../../public/pics/messaging.png"
              alt="Messaging App Logo"
            />
            <h1 className="section-title">Message App</h1>
          </div>
          <ul>
            <SidebarLi
              mdi={mdiAccountGroup}
              mdiO={mdiAccountGroupOutline}
              title={"Users"}
              to={"/users"}
              selected={location.pathname === "/users"}
            />
            <SidebarLi
              mdi={mdiChat}
              mdiO={mdiChatOutline}
              title={"Messages"}
              to={"/messages"}
              selected={location.pathname === "/messages"}
            />
            <SidebarLi
              mdi={mdiAccount}
              mdiO={mdiAccountOutline}
              title={"Profile"}
              to={"/profile"}
              selected={location.pathname === "/profile"}
            />
          </ul>
          
          <button
            className="sign-out-btn"
            onMouseEnter={() => setSignOutHover(true)}
            onMouseLeave={() => setSignOutHover(false)}
            onClick={() => handleSignOut()}
          >
            <Icon
              path={mdiLogout}
              title={"Sign Out"}
              size={1.5}
              color={signOutHover ? "#445ad1" : "black"}
            />
            <p>Sign Out</p>
          </button>

        </section>
        <section className="main-display">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

SidebarLi.propTypes = {
  mdi: PropTypes.string.isRequired,
  mdiO: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

export default App;
