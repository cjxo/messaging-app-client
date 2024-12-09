import { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdilAccount } from '@mdi/light-js';

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
            <div className="label-value-pair">
              <p className="label">Username: </p>
              <p>{profile.username}</p>
            </div>

            <div className="label-value-pair">
              <p className="label">Name: </p>
              <p>{profile.firstName} {profile.lastName}</p>
            </div>

            <div className="label-value-pair">
              <p className="label">Email: </p>
              <p>{profile.email}</p>
            </div>
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

export default Profile;
