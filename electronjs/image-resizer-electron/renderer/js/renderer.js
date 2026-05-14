const form = document.getElementById('img-form');
const img = document.getElementById('img');
const outputPath = document.getElementById('output-path');
const filename = document.getElementById('filename');
const heightInput = document.getElementById('height');
const widthInput = document.getElementById('width');

const loadImage = (e) =>{
    const file = e.target.files[0];

    if(!isFileImage(file)){
        alertMessage("Please select an image", 'success');
        return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = function(){
        widthInput.value = this.width;
        heightInput.value = this.height;
    }

    form.style.display = 'block';
    filename.innerText = file.name;
    outputPath.innerText = path.join(os.homedir(), 'imageresizer');
}

const sendImage = (e) =>{
    e.preventDefault();

    const width = widthInput.value;
    const height = heightInput.value;
    const imgPath = img.files[0].webkitRelativePath || img.files[0].name;

    if(!img.files[0]){
        alertMessage("Please upload an image", 'error');
        return;
    }

    if(width === '' || height === ''){
        alertMessage("Please fill in a height and width", 'error');
        return;
    }

    //Send to main using ipcRenderer
    ipcRenderer.send('image:resize',{
        imgPath,
        width,
        height,
    });

    ipcRenderer.on('image:done',() =>{
        alertMessage(`Image resized to ${widthInput.value} x ${heightInput.value}`,'success');
    })
}

const isFileImage = (file) =>{
    const acceptedImageTypes = ['image/gif','image/png','image/jpeg'];
    return file && acceptedImageTypes.includes(file['type']);
}

const alertMessage = (message, status) => {
    if(status === 'success')
    {
        Toastify.toast({
            text: message,
            duration: 5000,
            close: false,
            style: {
                background: 'green',
                color: 'white',
                textAlign: 'center'
            }
        });
    }
    else
    {
        Toastify.toast({
            text: message,
            duration: 5000,
            close: false,
            style: {
                background: 'red',
                color: 'white',
                textAlign: 'center'
            }
        });
    }
}

img.addEventListener('change', loadImage);
form.addEventListener('submit', sendImage);
