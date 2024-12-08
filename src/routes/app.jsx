import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
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
  const location = useLocation();
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
          <h1 className="section-title">Message App</h1>    
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
        </section>
        <section className="main-display">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default App;
