import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Icon from '@mdi/react';
import { mdilAccount } from '@mdi/light-js';

import api from "../api/api";

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
              <button className="prof-options disabled" disabled aria-disabled="true">
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
  const [users, setUsers] = useState([]);

useEffect(() => {
    api
      .user
      .getAllExceptMe()
      .then(result => {
        console.log(result.message);
        setUsers(result.users);
      });
  }, []);

  const onAdd = (idx) => {
    const usersPrime = [...users];
    usersPrime[idx].alreadyadded = true;
    setUsers(usersPrime);

    api
      .message
      .addUser(users[idx].id)
      .then(result => {
        console.log(result);
      });
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
              alreadyAdded={user.alreadyadded}
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
