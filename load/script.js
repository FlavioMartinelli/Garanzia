var lastTarget = null;
var currentelement = null;


function lista() {
    $.ajax({
        type: "POST",
        url: "getClienti.php",
        success: function (x) {
            $("#clienti").html('<table><tr><td>Cognome<td>Nome<td>Email<td>Telefono<td>Indirizzo<td>Citta<td>Provincia</tr>' + x + '</table>');
            var doc = new jsPDF();
            var specialElementHandlers = {
                '#editor': function (element, renderer) {
                    return true;
                }
            };
            doc.fromHTML($('#clienti').html(), 15, 15, {
                'width': 170,
                'elementHandlers': specialElementHandlers
            });
            doc.save('clienti.pdf');
        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });
}

function isFile(evt) {
    var dt = evt.dataTransfer;

    for (var i = 0; i < dt.types.length; i++) {
        if (dt.types[i] === "Files") {
            return true;
        }
    }
    return false;
}

window.addEventListener("dragenter", function (e) {
    if (isFile(e)) {
        lastTarget = e.target;
        document.querySelector("#dropzone").style.visibility = "";
        document.querySelector("#dropzone").style.opacity = 1;
        document.querySelector("#textnode").style.fontSize = "48px";
    }
});

window.addEventListener("dragleave", function (e) {
    e.preventDefault();
    if (e.target === document || e.target === lastTarget) {
        document.querySelector("#dropzone").style.visibility = "hidden";
        document.querySelector("#dropzone").style.opacity = 0;
        document.querySelector("#textnode").style.fontSize = "42px";
    }
});

window.addEventListener("dragover", function (e) {
    e.preventDefault();
});

window.addEventListener("drop", function (e) {
    e.preventDefault();
    document.querySelector("#dropzone").style.visibility = "hidden";
    document.querySelector("#dropzone").style.opacity = 0;
    document.querySelector("#textnode").style.fontSize = "42px";
    checkFile(e.dataTransfer.files);
});

function checkFile(e) {
    if (e.length == 1) {
        var fname = e[0].name.split('.').pop();
        currentelement = e;
        if (fname == 'csv') {
            document.querySelector("#text").innerHTML =
                "<b>File selezionato:</b><br>" + e[0].name + '<br><br>';
            // ng-click="uploadExcel()" 
        } else {
            document.querySelector("#text").innerHTML = "<b>File selezionato non valido<br></b>scegli un file .csv<br><br>";
        }
    }
}

function upload() {
    if (!browserSupportFileUpload()) {
        alert('The File APIs are not fully supported in this browser!');
    } else {
        var data = null;
        var file = $('#upload').target.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (event) {
            var csvData = event.target.result;
            data = $.csv.toArrays(csvData);
            if (data && data.length > 0) {
                alert('Imported -' + data.length + '- rows successfully!');
            } else {
                alert('No data to import!');
            }
        };
        reader.onerror = function () {
            alert('Unable to read ' + file.fileName);
        };
    }
}

// Method that checks that the browser supports the HTML5 File API
function browserSupportFileUpload() {
    var isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
    }
    return isCompatible;
}


function succesUpload() {

    //legge e carica i dati

    //per ogni riga aggiunge una query a q
    var q = '';

    //carica i dati
    $.ajax({
        type: "POST",
        url: 'upload.php',
        data: {
            'query': q
        },
        success: function () {
            $('#textnode').html('CARICATO!');
            $("#dropzone").css('background-color', "green");
            $("#dropzone").css('visibility', "");
            $("#dropzone").css('opacity', '1');
            $("#textnode").css('fontSize', "48px");
            setTimeout(() => {
                location.reload();
            }, 1200);
        },
        error: function () {
            $('#textnode').html('Errore nel caricamento');
            $("#dropzone").css('background-color', "red");
            $("#dropzone").css('visibility', "");
            $("#dropzone").css('opacity', '1');
            $("#textnode").css('fontSize', "48px");
        }
    });
}

function failupload() {
    $('#textnode').html('Fattura gia esistente');
    $("#dropzone").css('background-color', "red");
    $("#dropzone").css('visibility', "");
    $("#dropzone").css('opacity', '1');
    $("#textnode").css('fontSize', "48px");
    setTimeout(() => {
        location.reload();
    }, 1200);
}

function newFattura(n) {

    $.ajax({
        type: "POST",
        url: 'getFattura.php',
        data: {
            'numeroFattura': n
        },
        success: function (data) {
            if ($.trim(data) == '0') {
                $.ajax({
                    type: "POST",
                    url: 'fattura.php',
                    data: {
                        'numeroFattura': n
                    },
                    success: function () {
                        succesUpload();
                    }
                });
            } else {
                failupload();
            }
        }
    });
}

function checkFattura(n) {}

$(function () {
    $("#upload_link").on('click', function (e) {
        e.preventDefault();
        $("#upload:hidden").trigger('click');
    });
});

let imageUpload = document.getElementById("upload");
imageUpload.onchange = function () {
    let input = this.files;
    checkFile(input);
};