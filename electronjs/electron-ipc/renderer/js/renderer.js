let nodeVersion = document.getElementById('node-version');
let chromeVersion = document.getElementById('chrome-version');
let electronVersion = document.getElementById('electron-version');

nodeVersion.innerText = version.node();
chromeVersion.innerText = version.chrome();
electronVersion.innerText = version.electron();

let mainMessage = document.getElementById('main-msg');

const func = async () => {
    const response = await message.ping()
    console.log(response);
    return response; // prints out 'pong'
  }
  
mainMessage.innerText = func();