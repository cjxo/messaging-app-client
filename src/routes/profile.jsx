import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Icon from '@mdi/react';
import {
  mdilAccount,
  mdilPencil,
  mdilCheck,
} from '@mdi/light-js';
import api from "../api/api";

// Desired Edit Mode Type:
// Only one and only one field is to be edited.
// Hence, if one is editing one field and switched to another field
// without saving, the new value is discarded.
const IdentityField = ({ name, value, finalize }) => {
  const [editMode, setEditMode] = useState(false);
  const [inpValue, setInpValue] = useState(value);
  if (editMode) {
    const handleValueChange = (e) => {
      setInpValue(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (inpValue !== value) {
        let type;
        switch (name) {
          case "Username": {
            type = "username";
          } break;

          case "First Name": {
            type = "first_name";
          } break;

          case "Last Name": {
            type = "last_name";
          } break;

          case "Email": {
            type = "email";
          } break;
        }

        finalize(type, inpValue)
        .then(result => {
          if (result) {
            setInpValue(inpValue);
          }
        });

      }

      setInpValue(value);
      setEditMode(false);
    };

    return (
      <form className="label-value-pair">
        <label className="label">{name}: </label>
        <input
          type={name === "Email" ? "email" : "text"}
          onChange={handleValueChange}
          value={inpValue}
        />
        <button onClick={handleSubmit}>
          <Icon
            path={mdilCheck}
            title={"Edit " + name}
            size={1.0}
          />
        </button>
      </form>
    );
  } else {
    return (
      <div className="label-value-pair">
        <p className="label">{name}: </p>
        <p>{value}</p>
        <button onClick={() => setEditMode(true)}>
          <Icon
            path={mdilPencil}
            title={"Edit " + name}
            size={1.0}
          />
        </button>
    </div>
    );
  }
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);
  const [editMessage, setEditMessage] = useState("");

  useEffect(() => {
    api
      .user
      .getProfile()
      .then(result => {
        if (result.ok) {
          setProfile(result.profile);
        }
      });
  }, []);

  const handleEdit = async (type, value) => {
    const result = await api.user.updateCredential(type, value);
    if (result.ok) {
      const profilePrime = { ...profile };
      profilePrime[type] = value;
      setProfile(profilePrime);
      setEditMessage("Success");
      setError(false);
    } else {
      setEditMessage(result.message);
      setError(true);
    }

    return result.ok;
  };
  
  if (profile) {
    return (
      <section className="profile-view">
        <h2 className="section-title">Profile</h2>
        <div className="user-detail">
          <div className="profile-pic">
            <Icon
              path={mdilAccount}
              title="User Profile"
              size={3}
            />
          </div>
          
          <div className="user-identity">
            <div
              className={error ? "error" : "success"}
              style={{ 
                display: editMessage ? "block" : "none"
              }}
            >
              {editMessage}
            </div>
            <IdentityField name={"Username"} value={profile.username} finalize={handleEdit} />
            <IdentityField name={"First Name"} value={profile.first_name} finalize={handleEdit} />
            <IdentityField name={"Last Name"} value={profile.last_name} finalize={handleEdit} />
            <IdentityField name={"Email"} value={profile.email} finalize={handleEdit} />
          </div>
        </div>
      </section>
    );
  } else {
    return (
      null
    );
  }
};

IdentityField.propTypes = {
  name: PropTypes.oneOf(["Username", "First Name", "Last Name", "Email"]).isRequired,
  value: PropTypes.string.isRequired,
  finalize: PropTypes.func.isRequired,
};

export default Profile;
