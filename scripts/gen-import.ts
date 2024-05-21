import fsp from 'fs/promises'
import path from 'path'

// for()
const res: string[] = []
const target = path.resolve(__dirname, '../src/import.ts')

function camelcase(s: string) {
  return s.substring(0, 1).toUpperCase() + s.substring(1)
}

async function genImport(dir: string) {
  const files = await fsp.readdir(dir)
  for (const file of files) {
    const realPath = path.join(dir, file)
    const s = await fsp.stat(realPath)
    if (s.isDirectory()) {
      await genImport(realPath)
    } else if (s.isFile()) {
      const parsed = path.parse(file)
      let name = parsed.name.split(/[-_]/).map(camelcase).join('')
      if (name.match(/^[0-9]/)) {
        name = camelcase(parsed.ext.substring(1)) + name
      }
      const imp = `export { default as ${name} } from '${path.relative(
        path.dirname(target),
        realPath,
      )}'`
      res.push(imp)
    }
  }
}

const assetsDir = path.resolve(__dirname, '../src/assets')
await genImport(assetsDir)
await fsp.writeFile(target, res.join('\n'))
