function search(){
    var cpf = document.getElementById('inputCPF').value;
    validation(cpf);
}
function validation(cpfValue){
    var storage = firebase.storage();
     /*Retorna uma promise que será processada*/
    storage.ref().child(cpfValue).listAll().then(function(allFiles){
        if(allFiles.items.length >=1){
            next(cpfValue);
        }else{
            alert('Cpf não encontrado');
        }
    }).catch(function(error){
        console.log('Erro', error);
    });     
}

function next(cpfValue){
    document.getElementById('busca').setAttribute("class", "ocultar");
    document.getElementById('resultado').removeAttribute("class", "ocultar");
    document.getElementById('tituloDocumentos').innerHTML = 'Certificados de: '+cpfValue;

}
function back(){
    document.getElementById('busca').removeAttribute("class", "ocultar");
    document.getElementById('resultado').setAttribute("class", "ocultar");
    document.getElementById("inputCPF").value = '';
}
