var reader = new FileReader();
var tokens = new CVecto();
var derivacion = new Sintaxis();
var _posn = 0;
var _pos_cr = 0;
var dropZone;
let crtrs_no_validos = 0;

function arrastrarArchivo(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    reader.readAsText(files[0]);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

function busquedaArchivo(evt) {
    var files = evt.target.files;
    reader.readAsText(files[0]);
}
window.onload = function() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        dropZone = document.getElementById('drop_zone');
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', arrastrarArchivo, false);
        document.getElementById('files').addEventListener('change', busquedaArchivo, false);
        reader.onloadend = function(evt) {
            if (evt.target.readyState == FileReader.DONE) {
                lectura(evt.target.result);
            }
        }; //hhhh
    } else {
        alert("las Api's de lectura de archivos no estan habilitadas en tu navegador :(");
    }
    deshabilitaRetroceso();
}

function lectura(txt_archvivo) {
    var n;
    var buffer = "";
    var Arreglito;
    var Arreglito2;
    //console.log(txt_archvivo);
    document.getElementById("contenedor_carga").style.display = "none";
    document.getElementById("Contenido").style.background = "rgba(25, 9, 8, 0.77)";
    document.getElementById("Contenido-2").style.background = "rgba(25, 9, 8, 0.77)";
    document.getElementById("Contenido").innerHTML += "<h3>Analisis lexico</h3><hr/>";
    document.getElementById("Contenido-2").innerHTML += "<h3>Analisis Sintactico</h3><hr/>";
    for (var i = 0; i < txt_archvivo.length; i++) {
        n = tokens.automata(txt_archvivo.charAt(i));
        //console.log(n + " " + txt_archvivo.charAt(i));
        if (n == -1) {
            //document.getElementById("Contenido").innerHTML += '<p>' + tokens.getClase() + buffer + '</p>';
            tokens.setEstado(0);
            derivacion.setTokenss(tokens.getClase());
            derivacion.setListaValores(buffer);
            buffer = "";
            i--;
        } else if (n == -2) {
            document.getElementById("Contenido").innerHTML += "<h4>Analisis lexico Fallido</h4>";
            i = txt_archvivo.length;
        } else {
            buffer += txt_archvivo.charAt(i);
        }
    }
    derivacion.ClasificaID();
    Arreglito = derivacion.getTokenss();
    Arreglito.push("#0");
    for (let j = 0; j < Arreglito.length; j++) {
        document.getElementById("Contenido").innerHTML += "<p>" + Arreglito[j] + "</p>";
    }
    //var Arreglito2 = derivacion.getListaValores();
    //document.getElementById("Contenido-2").style.background = "rgba(25, 9, 8, 0.77)";S
    for (let i = 0; i < Arreglito.length; i++) {
        //document.getElementById("Contenido").innerHTML += "<p>" + Arreglito[i] + "</p>";
        n = derivacion.FsTDerivacion(Arreglito[i]);
        console.log(n + " " + Arreglito[i]);
        if (n == -1) {
            derivacion.setState(0);
            derivacion.setListaDerivacion(derivacion.getValoresDer());
            //console.log(derivacion.getValoresDer());
            //document.getElementById("Contenido-2").innerHTML += "<p>" + derivacion.getValoresDer() + "</p>";
            i--;
        } else if (n == -2) {
            derivacion.setListaDerivacion("Error")
            document.getElementById("Contenido-2").innerHTML += "<p>No es posible compilar</p>";
            i = Arreglito.length;
        }
    }
    derivacion.Compiler();
    Arreglito2 = derivacion.getListaDeImpresion();
    for (let k = 0; k < Arreglito2.length; k++) {
        console.log(Arreglito2[k]);
        document.getElementById("Contenido-2").innerHTML += "<p>" + Arreglito2[k] + "</p>";
    }
    Arreglito = derivacion.getListaDerivacion();
    document.getElementById("Contenido-3").style.background = "rgba(25, 9, 8, 0.77)";
    document.getElementById("Contenido-3").innerHTML += "<h3>Reglas de derivacion</h3><hr/>";
    for (let l = 0; l < Arreglito.length; l++) {
        document.getElementById("Contenido-3").innerHTML += "<p>" + Arreglito[l] + "</p>";
    }
}

function deshabilitaRetroceso() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button"; //chrome
    window.onhashchange = function() { window.location.hash = "no-back-button"; }
        //document.getElementById("contenedor_carga").style.display = "none";
}