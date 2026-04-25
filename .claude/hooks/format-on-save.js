#!/usr/bin/env node
// Claude Code PostToolUse hook — Edit/Write 후 자동 포맷팅
// stdin으로 받은 JSON에서 file_path 추출 → 확장자별로 eslint/prettier 실행
// 에러는 조용히 무시 (hook이 도구 실행 결과를 차단하지 않도록)

const { execFileSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const LINT_EXTS = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'])
const PRETTIER_ONLY_EXTS = new Set([
  '.json',
  '.css',
  '.scss',
  '.md',
  '.mdx',
  '.html',
  '.yaml',
  '.yml',
])

let input = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', (chunk) => (input += chunk))
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input || '{}')
    const filePath = data?.tool_input?.file_path
    if (!filePath) return

    const projectDir = data?.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd()
    const absolute = path.resolve(filePath)

    // 프로젝트 외부 파일 무시
    if (!absolute.startsWith(path.resolve(projectDir))) return
    // 파일이 실제로 존재하는지 확인 (Edit이 실패했을 수도 있음)
    if (!fs.existsSync(absolute)) return

    const ext = path.extname(absolute).toLowerCase()
    const opts = { stdio: 'ignore', cwd: projectDir, timeout: 20000 }

    // node_modules의 바이너리를 직접 실행 — npx 부팅 비용 회피
    const eslintBin = resolveBin(projectDir, 'eslint')
    const prettierBin = resolveBin(projectDir, 'prettier')

    if (LINT_EXTS.has(ext)) {
      tryRun(eslintBin, ['--fix', absolute], opts)
      tryRun(prettierBin, ['--write', absolute], opts)
    } else if (PRETTIER_ONLY_EXTS.has(ext)) {
      tryRun(prettierBin, ['--write', absolute], opts)
    }
  } catch {
    // 무시
  }
})

function resolveBin(projectDir, name) {
  // Windows: .cmd, *nix: 바이너리 — 직접 node로 실행해 OS 차이 회피
  try {
    const pkgPath = require.resolve(`${name}/package.json`, { paths: [projectDir] })
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
    const binField = pkg.bin
    const binRel = typeof binField === 'string' ? binField : binField?.[name]
    if (!binRel) return null
    return path.resolve(path.dirname(pkgPath), binRel)
  } catch {
    return null
  }
}

function tryRun(binPath, args, opts) {
  if (!binPath) return
  try {
    execFileSync(process.execPath, [binPath, ...args], opts)
  } catch {
    // eslint/prettier가 종료 코드 1 반환해도 무시
  }
}
