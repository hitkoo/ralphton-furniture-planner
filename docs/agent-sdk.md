# Claude 호출 규칙

평면도 캡처와 상품 사진은 서버에서 Claude Agent SDK(`@anthropic-ai/claude-agent-sdk`, package.json에 들어 있다)로 읽는다. 쓰는 법은 공식 문서를 본다: https://code.claude.com/docs/en/agent-sdk/overview

## 계정과 모델

API 키는 쓰지 않는다. 각자 Claude Code에 로그인한 Claude Max 계정의 사용량으로 돈다. 모델은 `claude-sonnet-5-5`로 고정한다.

연결 상태는 `claude auth status --json`으로 확인한다. 'Claude 계정 연결' 버튼은 공식 명령 `claude auth login --claudeai`를 실행하고, 로그인은 사람이 브라우저에서 한다. 앱이 OAuth를 직접 구현하거나 토큰을 꺼내 API를 부르는 방식은 쓰지 않는다. 로그인은 사람이 해야 하므로 루프가 이 명령을 스스로 실행하지 않게 AGENTS.md에 적어 둔다.

## 이미지 변환 호출

이미지를 JSON으로 바꾸는 호출에는 Claude Code의 도구(파일 읽기, 명령 실행 등)와 사용자 설정(CLAUDE.md, 스킬)을 싣지 않는다. 실으면 호출이 몇 배 무거워지고 한도가 빨리 닳는다. 어떤 옵션으로 끄는지는 공식 문서에서 찾는다.

변환 결과의 형식은 [plan-format.md](plan-format.md)를 따른다. 실측으로는 평면도 한 장에 약 20초, 상품 사진 한 장에 5~8초 걸렸다.

## 테스트에서는 실제로 부르지 않는다

루프와 앱이 같은 Claude Max 한도를 나눠 쓴다. 자동 테스트마다 실제로 부르면 한도가 금방 닳는다.

자동 테스트에서는 Claude 응답 대신 정답 파일을 넣어 쓴다. 평면도는 `data/plans/example/plan.json`, 상품 사진은 `data/products/expected.json`이다. 실제 호출은 기능을 처음 붙였을 때 확인용으로 한 번만 한다.
