window.addEventListener('DOMContentLoaded',()=>{
    const renderVersion = (selector, text) =>{
        const element = document.getElementById(selector);
        if(element)
            element.innerText = text;
    }

    for(const dependency of ['electron', 'chrome', 'node']){
        renderVersion(`${dependency}-version`,process.versions[`${dependency}`]);
    }
})

