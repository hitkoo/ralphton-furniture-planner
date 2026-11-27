import type { Plugin } from 'vite'

// 브라우저가 부르는 서버 API. Vite 개발 서버 안에서 Node로 돈다.
// Claude 계정 연결 확인, 평면도·상품 사진 변환(Agent SDK), 파일 저장 같은 API를 여기에 만든다.
// Claude 호출 규칙은 docs/agent-sdk.md를 보라.
export function apiPlugin(): Plugin {
  return {
    name: 'api',
    configureServer(server) {
      server.middlewares.use('/api/health', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: true }))
      })
    },
  }
}
