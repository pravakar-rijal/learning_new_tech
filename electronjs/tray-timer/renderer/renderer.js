const time = document.getElementById('time');

message.send('timer:update',time.innerText);

message.send('timer:complete', "");