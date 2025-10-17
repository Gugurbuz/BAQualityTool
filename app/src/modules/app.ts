import { renderUI } from './ui'
import { setupAutosave } from './autosave'
import { setupGadget } from './gadget'

export function initApp(): void {
  document.addEventListener('DOMContentLoaded', () => {
    renderUI()
    setupAutosave()
    setupGadget()
  })
}
