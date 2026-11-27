import './style.css'

// 시작 화면. 이 파일부터 고쳐 나가면 된다.
const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <h1>가구 배치 시뮬레이터</h1>
  <p id="health">서버 확인 중…</p>
`

fetch('/api/health')
  .then((r) => r.json())
  .then((d: { ok: boolean }) => {
    document.querySelector('#health')!.textContent = d.ok ? '서버 연결됨' : '서버 응답 이상'
  })
  .catch(() => {
    document.querySelector('#health')!.textContent = '서버에 연결하지 못함'
  })
