import React from 'react';
import { Jumbotron } from 'reactstrap';

const Err = ({ httpCode }) => {
  const checkError = httpCode => {
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
          '서버 점검 중이거나 과도한 접속으로 인해 해당 서버가 응답할 수 없습니다. 잠시 후 다시 시도해주세요.';
        break;
      }
      default: {
        break;
      }
    }
    return contents;
  };

  return (
    <Jumbotron>
      <div className="display-1">{httpCode ? httpCode : '404'} Error</div>
      <hr />
      <div className="display-5">{checkError(httpCode ? httpCode : 404)}</div>
    </Jumbotron>
  );
};

export default Err;
