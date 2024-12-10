import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Icon from '@mdi/react';
import {
  mdilAccount,
  mdilPencil,
  mdilCheck,
} from '@mdi/light-js';

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
      if (inpValue !== value) {
        let type;
        switch (name) {
          case "Username": {
            type = "username";
          } break;

          case "First Name": {
            type = "firstName";
          } break;

          case "Last Name": {
            type = "lastName";
          } break;

          case "Email": {
            type = "email";
          } break;
        }

        finalize(type, inpValue);
      }
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
        <p>{inpValue}</p>
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

  useEffect(() => {
    setProfile({
      username: "gigglesbiggles",
      firstName: "FirstName",
      lastName: "LastName",
      email: "FakeEmail@email.com",
    });
  }, []);

  const handleEdit = (type, value) => {
      // TODO: api.user.changeDetail({ type, value });
  };
  
  if (profile) {
    return (
      <section className="profile-view">
        <div className="user-detail">
          <div className="profile-pic">
            <Icon
              path={mdilAccount}
              title="User Profile"
              size={3}
            />
          </div>
          
          <div className="user-identity">
            <IdentityField name={"Username"} value={profile.username} finalize={handleEdit} />
            <IdentityField name={"First Name"} value={profile.firstName} finalize={handleEdit} />
            <IdentityField name={"Last Name"} value={profile.lastName} finalize={handleEdit} />
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
