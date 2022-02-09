
/* 
    걸러낼 좌표
    Die X, Die Y
    318, 358
    298, 330
    321, 326
    348, 316
    328, 288
*/

const downloadBt = document.getElementById('download');
const loadingLayer = document.getElementById('loadingLayer');

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

    loadingLayer.classList.add('on');
    downloadBt.classList.remove('on');  
    
    for(let i=0; i<fileList.length; i+=1) {
        JSZip.loadAsync(fileList[i]).then((zip) => {
            for(const [k,v] of Object.entries(zip.files)) {
                const name = k.split('/');
                const folderName = name[0];
                const fileName = name[1];
                const id = folderName.split('_')[1].split('-')[0];

                for(const reg of regex) {
                    if(reg.test(fileName)) {
                        resultZipFile.file(`${id}_${fileName}`, v._data);
                        break;
                    }
                }
            }
        })
        .then(() => {
            if(i === (fileList.length-1)) {
                loadingLayer.classList.remove('on');
                downloadBt.classList.add('on');
            }
        });
    }

    downloadBt.addEventListener('click', (event) => {
        resultZipFile.generateAsync({type:"Blob"}).then(function (content) {
            let link = document.createElement('a');
            link.style.display = 'none';
            document.body.appendChild(link);

            link.href = URL.createObjectURL(content);
            link.download = `download.zip`;
            link.click();

            document.body.removeChild(link);
            link = null;
            
            downloadBt.classList.remove('on');  
       });
    })

})