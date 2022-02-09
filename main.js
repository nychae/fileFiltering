
/* 
    걸러낼 좌표
    Die X, Die Y
    318, 358
    298, 330
    321, 326
    348, 316
    328, 288
*/

const resultZipFile = new JSZip();

const regex = [
    new RegExp('X318Y358'),
    new RegExp('X298Y330'),
    new RegExp('X321Y326'),
    new RegExp('X348Y316'),
    new RegExp('X328Y288'),
]

document.querySelector('.file-input INPUT').addEventListener('change', (event) => {
    const fileList  = event.currentTarget.files;
    const label = document.querySelector('.file-input .label');

    if(fileList.length === 0) {
        label.innerText = 'No file selected';
        return;
    } else {
        label.innerText = `${fileList.length} files selected`;
    }
                              
    for(const zipFile of fileList) {
        JSZip.loadAsync(zipFile).then((zip) => {
            for(const [k,v] of Object.entries(zip.files)) {
                const fileName = k.split('/')[1];
                for(const reg of regex) {
                    if(reg.test(fileName)) {
                        resultZipFile.file(fileName, v._data);
                        break;
                    }
                }
            }
        })
        .then(() => {
            resultZipFile.generateAsync({type:"Blob"}).then(function (content) {
                let link = document.createElement('a');
                link.style.display = 'none';
                document.body.appendChild(link);

                link.href = URL.createObjectURL(content);
                link.download = `다운로드.zip`;
                link.click();

                document.body.removeChild(link);
                link = null;
                
           });
        });
    }


})