function search(){
    var cpf = document.getElementById('inputCPF').value;
    validation(cpf);
}
function validation(cpfValue){
    var storage = firebase.storage();
     /*Retorna uma promise que será processada*/
    storage.ref().child(cpfValue).listAll().then(function(allFiles){
        if(allFiles.items.length >=1){
            listFiles(cpfValue);
            next(cpfValue);
        }else{
            alert('Cpf não encontrado');
        }
    }).catch(function(error){
        console.log('Erro', error);
    });     
}

function listFiles(cpfValue){
    document.getElementById('tituloDocumentos').innerHTML = 'Certificados de: '+cpfValue;
    var storage = firebase.storage();
    var fileNames = [];
    var fileLinks = [];
    var files;
    storage.ref().child(cpfValue).listAll().then(function(allFiles){
        files = allFiles.items;
        console.log(files);
        for(let i=0; i<files.length; i++){
            fileNames.push(files[i].name);
            storage.ref(cpfValue+'/'+fileNames[i]).getDownloadURL().then(function(url){
                //console.log(url);
                var ul = document.getElementById("list");
                var li = document.createElement("li");
                var listItems = "<a href = '"+url+"' target='_blank'>"+fileNames[i]+"</a>";
                li.innerHTML = listItems;
                ul.appendChild(li);
                fileLinks.push(url);
            }).catch(function(error){
                console.log(error);
            }).finally(function(){
                console.log(fileNames[i]);
                console.log(fileLinks[i]);
                
            });       
         }
    });
}

function next(cpfValue){
    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
}

function back(){
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById("inputCPF").value = '';
}
