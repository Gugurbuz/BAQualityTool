import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

async function run(){
  const file = path.resolve(process.cwd(), 'dist', 'index.html')
  try{
    const html = await readFile(file, 'utf8')
    // already single-file via plugin; keep for future custom transforms
    await writeFile(file, html, 'utf8')
    console.log('Single-file bundle ready:', file)
  }catch(e){
    console.error('Bundle failed:', e)
    process.exitCode = 1
  }
}
run()
