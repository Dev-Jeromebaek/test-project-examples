import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import DashboardCardList from '../components/dashboard/DashboardCardList';

export default class Dashboard extends Component {
  render() {
    return this.props.match.path === '/' ? (
      <Redirect to="/dashboard" />
    ) : (
      <DashboardCardList />
    );
  }
}
