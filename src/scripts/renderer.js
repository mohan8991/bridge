var uploadFile = document.getElementById('upload');

//upon clicking upload file, request the file from the main process
uploadFile.addEventListener('click', () => {
    window.myAPI.doAThing();
});
