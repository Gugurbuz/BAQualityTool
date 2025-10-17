export function renderUI(): void {
  const root = ensureRoot()
  root.innerHTML = `
    <header>
      <h1>İş Analizi Değerlendirme</h1>
    </header>
    <main>
      <nav>
        <button id="to-1">1</button>
        <button id="to-2">2</button>
        <button id="to-3">3</button>
        <button id="to-4">4</button>
      </nav>
      <section id="stage"></section>
    </main>
  `
}

function ensureRoot(): HTMLElement {
  let el = document.getElementById('app')
  if (!el) {
    el = document.createElement('div')
    el.id = 'app'
    document.body.appendChild(el)
  }
  return el
}
