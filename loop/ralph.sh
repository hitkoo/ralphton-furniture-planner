#!/usr/bin/env bash
# Ralph Loop 실행 예시. Claude Code를 새 컨텍스트로 반복해서 부른다. 다른 도구를 써도 된다.
# 사용법: ./loop/ralph.sh [최대 반복 횟수]   (기본 30)
# 모델을 고르려면: MODEL=sonnet ./loop/ralph.sh 30   (지정하지 않으면 Claude Code 기본 모델)
set -u
cd "$(dirname "$0")/.."
MAX=${1:-30}
mkdir -p loop/logs

for i in $(seq 1 "$MAX"); do
  if [ -f loop/DONE ]; then echo "loop/DONE 파일이 있어 멈춘다"; break; fi
  if [ -f loop/STOP ]; then echo "loop/STOP 파일이 있어 멈춘다"; break; fi

  log="loop/logs/$(printf '%02d' "$i").txt"
  echo "=== 반복 $i/$MAX 시작 $(date '+%H:%M:%S') ==="
  claude -p "$(cat loop/PROMPT.md)" \
    ${MODEL:+--model "$MODEL"} \
    --permission-mode acceptEdits \
    --allowedTools "Bash(npm *)" "Bash(npx *)" "Bash(node *)" "Bash(git *)" "Bash(ls *)" "Bash(cat *)" \
    --output-format text > "$log" 2>&1
  echo "--- 반복 $i 끝 $(date '+%H:%M:%S'), 마지막 출력:"
  tail -n 5 "$log"
done
