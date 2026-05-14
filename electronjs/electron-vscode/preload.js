// //const monaco = require('monaco-editor');
// const { contextBridge } = require('electron');
// //const { editor } = require('monaco-editor');


// // contextBridge.exposeInMainWorld('editor', {
    // //     make: (element, options) => monaco.editor.create(element, options),
    // // })
    
    const { contextBridge } = require('electron');
    
    contextBridge.exposeInMainWorld('version', {
        node: () => process.versions.node,
        chrome: () => process.versions.chrome,
        electron: () => process.versions.electron,
    });
    
contextBridge.exposeInMainWorld('monacoLoader', {
  init: () => {
    return new Promise((resolve) => {
      // Create loader script
      const loaderScript = document.createElement('script');
      loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js';
      
      loaderScript.onload = () => {
        // Create config script
        const configScript = document.createElement('script');
        configScript.text = `
          require.config({
            paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' },
            ignoreDuplicateModules: true
          });
          require(['vs/editor/editor.main'], function() {
            window.monacoReady = true;
          });
        `;
        
        document.head.appendChild(configScript);
        
        // Poll for Monaco readiness
        const checkReady = setInterval(() => {
          if (window.monacoReady) {
            clearInterval(checkReady);
            resolve();
          }
        }, 100);
      };
      
      document.head.appendChild(loaderScript);
    });
  }
});