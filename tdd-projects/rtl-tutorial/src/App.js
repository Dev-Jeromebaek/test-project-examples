import React from 'react';
import Profile from './Profile';
import Counter from './Counter';
//! async 테스트
import DelayedToggle from './DelayedToggle';
//! REST API 테스트 (with jsonplaceholder)
import UserProfile from './UserProfile';

function App() {
  return (
    <>
      <Profile username="jeromeBaek" name="백승엽" />
      <Counter />
      <DelayedToggle />
      <UserProfile id={1} />
    </>
  );
}

export default App;
