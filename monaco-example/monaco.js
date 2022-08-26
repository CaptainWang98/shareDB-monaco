/* eslint-env browser */
import * as monaco from 'monaco-editor'
import ShareDBMonaco from "sharedb-monaco";
import sharedb from 'sharedb/lib/client';
import ReconnectingWebSocket from 'reconnecting-websocket';


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
  console.log('loadddd!!!', window.location.host);
  const socket = new ReconnectingWebSocket('ws://localhost:8081');
  const connection = new sharedb.Connection(socket);

  // window.disconnect = function() {
  //   connection.close();
  // };
  // window.connect = function() {
  //   var socket = new ReconnectingWebSocket('ws://' + window.location.host);
  //   connection.bindToSocket(socket);
  // };

  // var doc = connection.get('examples', 'willxywang');

  // doc.subscribe(function(err) {
    // if (err) throw err;

    const editor = monaco.editor.create(/** @type {HTMLElement} */ (document.getElementById('monaco-editor')), {
      value: 'WIIIIIIILLLLLLLDLASLDALWD',
      language: 'javascript',
      theme: 'vs-dark'
    })
    console.log('editor', editor.getModel().getValue());

    const binding = new ShareDBMonaco({
      id: 'willxywang',
      namespace: 'examples',
      sharePath: 'text',
      connection: connection,
      model: editor.getModel()
    });
    const model = binding.add(editor);

    // editor.setModel(model);

    window.example = { editor, model };
  });
// })
