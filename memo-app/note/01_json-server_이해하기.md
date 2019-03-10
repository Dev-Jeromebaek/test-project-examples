## 01 json-server 사용하기

json server 는 아주 짧은 시간에 REST API 를 구축해주는 라이브러리입니다. 하지만, REST API 서버의 기본적인 기능을 대부분 갖추고 있는데요, 프로덕션 전용은 아닙니다. 프로토타입을 만들거나, 지금처럼 공부를 위하여 서버가 필요할때에 사용하면 아주 적당한 도구입니다.

### 설치하기 및 시작하기

우선 json-server 를 설치해봅시다. json-server 는 npm 을 통하여 글로벌 설치를 해주세요.

> yarn global add json-server 를 해도 되지만, 만약에 여러분이 nvm 을 사용하는 경우엔 제대로 작동하지 않을 수 도 있습니다.

```bash
$ npm i -g json-server
```

설치가 완료되었으면, fake-server 라는 디렉토리를 만들고, 그 안에 db.json 이라는 파일을 만드세요.

```
$ mkdir fake-server
$ touch db.json
```

db.json 의 파일 내용은 다음과 같이 memo 라는 배열을 입력해주시면 되겠습니다:

#### `db.json`

```json
{
  "memo": [
      {
          "id": 1,
          "title": "첫 메모 제목",
          "body": "첫 메모 내용"
      }
  ]
}
```

그 다음에, fake-server 디렉토리에서 다음 명령어를 통하여 서버를 실행하세요

```bash
$ json-server --watch db.json --port 3001
```

> 3000 포트는 리액트 개발서버가 사용하는 기본 포트이기때문에 포트를 3001으로 했습니다.

그러면, REST API 서버가 열리게됩니다.

이제 HTTP Client 도구인 [포스트맨(Postman)](https://www.getpostman.com/) 을 설치하고, 실행해주세요. 이 도구는 모든 운영체제에서 지원되며, 크롬 확장프로그램으로도 설치 할 수 있습니다.

포스트맨을 실행하셨다면 다음과 같이 주소창에 `http://localhost:3001/memo` 을 입력해서 GET 요청을 해보세요.

![img](https://redux-advanced.vlpt.us/images/postman.png)

위와 같이 배열이 반환되었나요? 이번엔 POST 메소드를 통하여 메모를 등록해보겠습니다. 주소창 왼쪽의 GET 을 눌러 POST 로 전환하고, 하단의 body 를 클릭한 다음에 raw 선택, 그리고 우측의 셀렉트 박스에서 JSON 을 선택하세요.

그 다음엔, 바디 내용으로는 다음과 같이 입력하세요

```json
{
    "title": "테스팅",
    "body": "테스팅"
}
```

Send 를 눌르고 다음과같이 id가 포함되어 반환이 되는지 확인하세요.

![img](https://redux-advanced.vlpt.us/images/postman-post.png)

이제 다시 GET 으로 요청을 해보시면 배열에 방금 우리가 넣은 데이터가 추가되어있을것입니다.

```json
[
  {
    "id": 1,
    "title": "첫 메모 제목",
    "body": "첫 메모 내용"
  },
  {
    "title": "hello",
    "body": "world",
    "id": 2
  }
]
```

json-server 에서는 단순히 데이터를 넣고 조회하는 것 외에도 페이징, 필터링, 정렬, 수정, 삭제 등의 기능을 지원합니다.

우리가 이번에 사용 할 기능들을 미리 한번 알아보겠습니다.

### 정렬 (sort)

소팅을 할때는 쿼리 파라미터로 `_sort` 와 `_order`를 설정하면 됩니다.

다음 요청들은 id 를 기준으로 역순, 혹은 순서대로 값을 불러옵니다.

```text
GET /memo?_sort=id&_order=DESC
GET /memo?_sort=id&_order=ASC
```

### 연산자 (Operators)

특정 필드가 주어진 값보다 크거나 작은 데이터들을 불러올때는, `_gte`, `_lte`, `_ne` 를 사용합니다.

- gte: 크거나 같다
- lte: 작거나 같다
- ne: 일치하지 않는다

```text
GET /memo?id_gte=10
GET /memo?id_lte=10
GET /memo?id_ne=10
```

### 제한 (limit)

한번에 불러올 데이터 수를 제한 할때는, `_limit` 을 사용합니다. 다음 요청은 데이터 수를 20으로 제한하여 데이터를 불러옵니다.

```text
GET /memo?_limit=20
```

### 삭제

데이터를 삭제할때는 일반 REST API 서버의 흐름을 따릅니다. 주소의 뒷부분에 데이터의 아이디를 넣어서 DELETE 메소드로 요청을 하면 됩니다.

```
DELETE /memo/10
```

### 수정

데이터를 수정 할때는 두가지 방법으로 진행합니다. PUT 메소드는 데이터를 아예 대치하고, PATCH 메소드는 리퀘스트 바디에서 주어진 필드만 수정합니다.

만약에 해당 데이터가 있다고 가정해봅시다.

```json
{
    "id": 1,
    "title": "hello",
    "body": "world"
}
```

만약에 PUT 요청으로 다음과 같이 날리게된다면:

```text
PUT /memo/1
{
    "title": "bye"
}
```

데이터는 다음과 같이 업데이트 될 것입니다.

```json
{
    "id": 1,
    "title": "bye"
}
```

body 필드가 주어지지 않았기 때문에 날라가버렸죠. 따라서, PUT 메소드로 수정을 해야 하는 경우엔 title 과 body 를 둘 다 전달해주어야합니다.

PATCH 메소드의 경우엔 아예 데이터 전체를 갈아끼우는게 아니라, 요청 리퀘스트 바디 에서 주어진 필드만 수정을 하기때문에 필드가 빠져있어도 정상적으로 업데이트 됩니다.

```text
PATCH /memo/1
{
    "title": "bye"
}
```

결과:

```json
{
    "id": 1,
    "title": "bye",
    "body": "world"
}
```

자, 이 정도만 숙지해두면 앞으로 메모앱을 구현함에 있어서 어려움은 없을 것 입니다. json-server 에는 더 많은 기능들이 있으니 궁금하시다면 [공식 매뉴얼](https://github.com/typicode/json-server)을 참조해보세요.