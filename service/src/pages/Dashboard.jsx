import React from 'react';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ match }) => {
  return match.path === '/' ? <Redirect to="/dashboard" /> : <h1>Hello</h1>;
};

export default Dashboard;
