# Loop 규칙

> 템플릿이다. "직접 채울 것"을 채운다. 루프는 매번 새 컨텍스트로 시작하므로, 이전 반복에서 알게 된 것은 파일(PROGRESS.md, INTERVENTIONS.md, git 기록)로만 이어진다.

## 작업 범위

- 필수 기능 1~5를 먼저 끝낸다. 선택 기능은 DoD.md의 필수 항목이 모두 통과한 뒤에만 시작한다.
- 범위 밖 기능은 만들지 않는다(README.md 참고).

## 한 번 반복할 때 하는 일

1. AGENTS.md, LOOP.md, PROGRESS.md, INTERVENTIONS.md를 읽는다.
2. PROGRESS.md의 할 일 중 가장 위의 하나를 고른다.
3. 구현한다.
4. DoD.md에 적힌 그 항목의 확인 명령을 실행한다.
5. 결과를 PROGRESS.md에 적는다.
6. 확인을 통과했으면 커밋한다. 커밋 메시지는 직접 정한다: (직접 채울 것)

## 반복 횟수와 멈추는 조건 (직접 채울 것)

- 최대 반복 횟수:
- 다 끝났다고 보는 조건: DoD.md의 필수 항목이 모두 통과
- 멈추는 조건 예: 같은 확인이 3번 연속 실패하면 멈추고 PROGRESS.md에 막힌 이유를 적는다.
- 16:45가 되면 멈춘다.

## 실행

`loop/ralph.sh`는 Claude Code를 반복해서 부르는 예시 스크립트다. 다른 도구를 써도 된다.

```bash
./loop/ralph.sh 30
```

- 매 반복은 `loop/PROMPT.md`를 지시문으로 받는다.
- `loop/DONE` 파일이 생기면 멈춘다. 루프에게 다 끝났을 때 이 파일을 만들라고 PROMPT.md에 적어 두었다.
- 사람이 멈추고 싶으면 `loop/STOP` 파일을 만든다(`touch loop/STOP`).
- 반복마다 출력은 `loop/logs/`에 남는다. 실행 로그로 제출한다.

## 사람이 개입할 때

- 루프 중에 사람이 코드를 직접 고쳐도 된다(가재 모자). 고쳤으면 바로 INTERVENTIONS.md에 적는다.
- 코드보다 이 파일, AGENTS.md, PROGRESS.md를 고쳐서 루프를 바로잡는 것이 먼저다.
