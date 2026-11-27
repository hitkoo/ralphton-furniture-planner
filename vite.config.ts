import { defineConfig } from 'vite'
import { apiPlugin } from './server/api.ts'

// 개발 서버 하나에서 화면(src/)과 서버 API(server/)가 같이 돈다.
export default defineConfig({
  plugins: [apiPlugin()],
  server: { port: 5173 },
})
