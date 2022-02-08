
/* 
    걸러낼 좌표
    Die X, Die Y
    318, 358
    298, 330
    321, 326
    348, 316
    328, 288
*/


document.querySelector('.file-input INPUT').addEventListener('change', (event) => {
    const fileList  = event.currentTarget.files;
    const lebel = document.querySelector('.file-input .label');

    if(fileList.length === 0) {
        label.innerText = 'No file selected';
        return;
    } else {
        label.innerText = `${fileList.length} files selected`;
    }

    for(const zipFile of fileList) {

    }

})