import React from 'react';

function Profile({ username, name }) {
  return (
    <div>
      <b>{username}</b>
      <span>({name})</span>
      <span>new</span>
    </div>
  );
}

export default Profile;