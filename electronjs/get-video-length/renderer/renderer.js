const videoLength = document.getElementById('get-length');
const video = document.getElementById('video-file');
const form = document.querySelector('form');

form.addEventListener('submit',(e) => {
    e.preventDefault();
    message.send('video:submit',video.files[0].name);
 });

 message.on('video:duration', (duration)=>{
    videoLength.innerHTML = `Your video is ${duration} seconds long!`;
});

