import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

import Icon from '@mdi/react';
import { mdilAccount } from '@mdi/light-js';

const UserLiCard = ({ username, userId, alreadyAdded, onAdd }) => {
  return (
    <li>
      <div className="profile-pic">
        <Icon
          path={mdilAccount}
          title="User Profile"
          size={3}
        />
      </div>
      <div className="user-detail">
        <h3>{username}</h3>
        
        <div>
          <Link className="prof-options" to={`/users/${userId}`}>View Profile</Link>
          {
            alreadyAdded ? (
              <button className="" disabled aria-disabled="true">
                Already Added
              </button>
            ) : (
              <button
                onClick={onAdd}
                className="prof-options"
              >
                Add To Chat
              </button>
            )
          }
        </div>
      </div>
    </li>
  );
};

const User = () => {
  const userParam = useParams();

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "gigglesbiggles",
      alreadyAdded: false,
    },
    {
      id: 2,
      username: "whiggle",
      alreadyAdded: true,
    }
  ]);

  const onAdd = (idx) => {
    const usersPrime = [...users];
    usersPrime[idx].alreadyAdded = true;
    setUsers(usersPrime);

    // TODO: api.msg.addUser(userId);
  };

  if (Object.hasOwn(userParam, "uid")) {
    // TODO: User Profile
  } else {
    return (
      <section className="all-users">
        <h3 className="section-title">All Users</h3>
        <ul className="all-user-list">
          {users.map((user, idx) => (
            <UserLiCard key={user.id}
              username={user.username}
              userId={user.id}
              alreadyAdded={user.alreadyAdded}
              onAdd={() => onAdd(idx)}
            />
          ))}
        </ul>
      </section>
    );
  }
};

UserLiCard.propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  alreadyAdded: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default User;
export { UserLiCard };
