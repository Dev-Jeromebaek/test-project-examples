import React from 'react';

function Profile({ username, name }) {
  return (
    <div>
      <b>{username}</b>
      <span>({name})</span>
    </div>
  );
}

export default Profile;