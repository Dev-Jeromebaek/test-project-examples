import React, { Fragment } from 'react';
import { Jumbotron } from 'reactstrap';
import { WettyConsumer } from '../Store';

const Error = () => {
  // 400: 서버가 요청을 이해하지 못할 때 발생한다. 클라이언트가 요청을 올바르게 보냈는지 검사해야 한다.
  // 404: 페이지를 찾을 수 없을 때 발생한다. ex) 주소를 잘못 입력 했을 때.
  // 500: 서버 내부의 오류기 때문에 서버 관리자가 반드시 확인해야 한다.
  // 503: 서버가 터졌거나(접속 폭주, DDoS 공격), 서버 유지보수 중일 때 발생한다.

  function checkError(httpCode) {
    let contents = '';

    switch (httpCode) {
      case 400: {
        contents =
          '서버가 요청을 이해하지 못하고 있습니다. 올바른 요청인지 확인해주세요.';
        break;
      }
      case 404: {
        contents = '페이지를 찾을 수 없습니다. 주소를 잘못 입력하지 않았나요?';
        break;
      }
      case 500: {
        contents = '서버 내부의 오류입니다. 서버 관리자에게 연락하세요.';
        break;
      }
      case 503: {
        contents =
          '과도한 접속으로 인해 해당 서버가 응답할 수 없습니다. 잠시 후 다시 시도해주세요.';
        break;
      }
      default: {
        break;
      }
    }
    return contents;
  }
  return (
    <Jumbotron>
      <WettyConsumer>
        {value => {
          return (
            <Fragment>
              <div className="display-1">
                {value.state.error.httpCode} Error
              </div>
              <hr />
              <div className="display-5">
                {checkError(value.state.error.httpCode)}
              </div>
            </Fragment>
          );
        }}
      </WettyConsumer>
    </Jumbotron>
  );
};

export default Error;
