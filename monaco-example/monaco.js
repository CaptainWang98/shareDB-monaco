/* eslint-env browser */
import * as monaco from 'monaco-editor'

// @ts-ignore
window.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return '/monaco-example/dist/json.worker.bundle.js'
    }
    if (label === 'css') {
      return '/monaco-example/dist/css.worker.bundle.js'
    }
    if (label === 'html') {
      return '/monaco-example/dist/html.worker.bundle.js'
    }
    if (label === 'typescript' || label === 'javascript') {
      return '/monaco-example/dist/ts.worker.bundle.js'
    }
    return '/monaco-example/dist/editor.worker.bundle.js'
  }
}

window.addEventListener('load', () => {
  const editor = monaco.editor.create(/** @type {HTMLElement} */ (document.getElementById('monaco-editor')), {
    value: 'Hi!',
    language: 'javascript',
    theme: 'vs-dark'
  })

  editor.onDidChangeModelContent(e => {
    console.log('onDidChangeModelContent e', e);
  })

  window.example = { editor }
})
