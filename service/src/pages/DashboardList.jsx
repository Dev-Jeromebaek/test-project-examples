import React, { Fragment } from 'react';
import DashboardCard from '../components/dashboard-list/DashboardCard';
import { Row, Container, Jumbotron } from 'reactstrap';
import { withContext } from '../Store';
import GlobalSpinner from '../components/global/GlobalSpinner';
import { ErrorPage } from '../pages';

class DashboardList extends React.Component {
  state = {
    dashboardList: [],
    isLoading: false,
    isError: false,
    errorCode: '',
    errorText: '',
  };

  async componentDidMount() {
    try {
      this.setState({
        isLoading: true,
      });

      const dashboardList = await this.props.value.actions.getDashboardList();

      this.setState({
        dashboardList: dashboardList.data.data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isError: true,
        errorCode: error.response.status,
        errorText: error.response.statusText,
      });
    }
  }

  render() {
    const {
      isLoading,
      dashboardList,
      isError,
      errorCode,
      errorText,
    } = this.state;
    return isError ? (
      <ErrorPage errorCode={errorCode} errorText={errorText} />
    ) : (
      <Container>
        <Row>
          {isLoading ? (
            <GlobalSpinner />
          ) : (
            <Fragment>
              {dashboardList ? (
                dashboardList.map((card, index) => {
                  return (
                    <DashboardCard
                      key={card.dashboardId}
                      card={card}
                      index={index}
                    />
                  );
                })
              ) : (
                <Jumbotron className="m-auto">
                  <h1 className="display-3">대시보드가 존재하지 않습니다.</h1>
                  <hr />
                  <h1 className="display-5">
                    <a href="">Admin</a>으로 이동해서 대시보드를 만드세요!
                  </h1>
                </Jumbotron>
              )}
            </Fragment>
          )}
        </Row>
      </Container>
    );
  }
}

export default withContext(DashboardList);
