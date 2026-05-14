// 1. Configure Monaco paths
require.config({ 
    paths: { 
      vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs'
    }
  });

  // 2. Load Monaco core
  require(['vs/editor/editor.main'], function() {
    // 3. Initialize editor
    const editor = monaco.editor.create(document.getElementById('editor'), {
      value: [
        '// JavaScript Editor Ready!', 
        'function hello() {',
        '  console.log("Hello from Monaco!");',
        '}'
      ].join('\n'),
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true
    });
    
    console.log('Monaco initialized!');
  });

  const nodeVersion = document.querySelector('#node-version');
  const chromeVersion = document.querySelector('#chrome-version');
  const electronVersion = document.querySelector('#electron-version');

  nodeVersion.innerText = version.node();
  chromeVersion.innerText = version.chrome();
  electronVersion.innerText = version.electron();
  

const files = document.querySelector('#file');

files.addEventListener('click', () => {
  console.log("Files clicked.");
})