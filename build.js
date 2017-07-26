#!/usr/bin/env node
/**
 * build ja.md
 */
const fs = require('fs')
const { join } = require('path')

process.chdir(join(__dirname))

let dirs = fs.readdirSync('src')
for (let dir of dirs) {
  let srcPath = `src/${dir}/both.md`
  let jaPath = `src/${dir}/jp.md`

  if (!fs.existsSync(srcPath)) {
    continue
  }
  let text = fs.readFileSync(srcPath).toString()
  let texts = text.split('\n').map(str => str.trim())
  if (texts.length < 3) {
    continue
  }
  let jaSentences = texts.filter(
    (text, i) => !/^[a-zA-Z0-9]/.test(text)
  ).map(
    (text) => text + '\n'
  )
  let ja = jaSentences.join('')
  fs.writeFileSync(jaPath, ja)
}
