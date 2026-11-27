# AGENTS.md

> 템플릿이다. "직접 채울 것"이라고 적힌 곳을 자기 규칙으로 채운다. "바꾸지 않는 규칙"은 과제 공통이라 그대로 둔다.

## 프로젝트

- 과제 명세는 [README.md](README.md), 배치 규칙은 [RULES.md](RULES.md), 파일 형식은 [docs/plan-format.md](docs/plan-format.md), Claude 호출 규칙은 [docs/agent-sdk.md](docs/agent-sdk.md)에 있다.
- 스택은 Node.js 22, Vite, TypeScript다. 화면은 `src/`, 서버 API는 `server/`, 화면과 서버가 같이 쓰는 타입은 `shared/types.ts`에 둔다.
- 실행은 `npm install && npm run dev`(http://localhost:5173), 테스트는 `npm test`, 빌드는 `npm run build`다.

## 바꾸지 않는 규칙

- `data/`와 `samples/`의 파일은 정답이므로 고치지 않는다.
- 외부 API 키를 쓰지 않는다. Claude 호출은 docs/agent-sdk.md의 방식(Agent SDK, `claude-sonnet-5-5`)만 쓴다.
- 자동 테스트에서 Claude를 실제로 부르지 않는다. 정답 파일(`data/plans/example/plan.json`, `data/products/expected.json`)을 응답 대신 넣어 쓴다.
- `claude auth login`을 스스로 실행하지 않는다. 로그인은 사람이 한다.
- 범위 밖 기능(상품 링크로 가구 가져오기, 로그인과 DB, 모바일 화면)은 만들지 않는다.
- 화면 문구는 한국어로 쓴다.

## 작업 방식 (직접 채울 것)

- 한 번 반복할 때 하는 일의 크기:
- 필수 기능을 만드는 순서:
- 끝났다고 말하기 전에 확인할 것: [DoD.md](DoD.md)의 해당 항목
- 막혔을 때 할 일:

## 하지 말 것 (직접 채울 것)

- 예: 테스트를 통과시키려고 테스트나 정답 파일을 고치지 않는다.
-

## 기록

- 반복이 끝날 때마다 [PROGRESS.md](PROGRESS.md)에 한 일, 다음 할 일, 실패한 확인을 적는다.
- 사람이 직접 고친 내용은 [INTERVENTIONS.md](INTERVENTIONS.md)에 있다. 반복을 시작할 때 읽는다.
