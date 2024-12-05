import { useParams } from "react-router-dom";
import Icon from '@mdi/react';
import { mdilAccount } from '@mdi/light-js';

const User = () => {
  const userParam = useParams();
  //console.log(Object.hasOwn(userParam, "uid"));

  return (
    <section className="all-users">
      <h3 className="section-title">All Users</h3>
      <ul className="all-user-list">
        <li>
          <div className="profile-pic">
            <Icon
              path={mdilAccount}
              title="User Profile"
              size={3}
            />
          </div>
          <div className="user-detail">
            <h3>Username</h3>
            <button>Add To Chat</button>
          </div>
        </li>

        <li>
          <div className="profile-pic">
            <Icon
              path={mdilAccount}
              title="User Profile"
              size={3}
            />
          </div>
          <div className="user-detail">
            <h3>Username</h3>
            <button>Add To Chat</button>
          </div>
        </li>

        <li>
          <div className="profile-pic">
            <Icon
              path={mdilAccount}
              title="User Profile"
              size={3}
            />
          </div>
          <div className="user-detail">
            <h3>Username</h3>
            <button>Add To Chat</button>
          </div>
        </li>
        <li>
          <div className="profile-pic">
            <Icon
              path={mdilAccount}
              title="User Profile"
              size={3}
            />
          </div>
          <div className="user-detail">
            <h3>Username</h3>
            <button>Add To Chat</button>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default User;
