var lastFattura = 0;

document.getElementById("upload").addEventListener('change', function () {
    var fr = new FileReader();
    fr.onload = function () {
        // document.getElementById("fileContents").textContent = this.result;
        var arr = this.result.replace(/\n/g, ',').split(',');
        arr.splice(0, 2);
        setArr(arr);
    }
    fr.readAsText(this.files[0]);
})

function setArr(a) {
    var query = '';
    a.splice(-1, 1);
    console.log(a);
    a.forEach(element => {
        var fatt = element.split(';');
        var dataxF = fatt[10];
        var datapart = dataxF.split('-');
        var dataFinale = datapart[2] + '-' + datapart[1] + '-' + datapart[0];
        dataFinale = dataFinale.replace(/(\r\n|\n|\r)/gm, "");
        console.log(dataFinale);

        $.ajax({
            type: "POST",
            url: "checkFattura.php",
            data: {
                'nFattura': fatt[0]
            },
            dataType: 'text',
            success: function (x) {
                if (x == '1') {
                    $('#textnode').html('Fattura gia esistente');
                    $("#dropzone").css('background-color', "red");
                    $("#dropzone").css('visibility', "");
                    $("#dropzone").css('opacity', '1');
                    $("#textnode").css('fontSize', "48px");
                    setTimeout(() => {
                        location.reload();
                    }, 1200);
                } else {
                    $.ajax({
                        type: "POST",
                        url: "addProdFatt.php",
                        data: {
                            'nFattura': fatt[0],
                            'riferimento': fatt[1],
                            'codice': fatt[2],
                            'tipologia': fatt[3],
                            'ferramenta': fatt[4],
                            'lunghezza': fatt[5],
                            'altezza': fatt[6],
                            'legno': fatt[7],
                            'finitura': fatt[8],
                            'vetro': fatt[9],
                            'dataFattura': dataFinale
                        },
                        dataType: 'text',
                        success: function (x) {
                            console.log(x);
                            //console.log(x);
                            //console.log('fattura creata');
                            $('#textnode').html('CARICATO!');
                            $("#dropzone").css('background-color', "green");
                            $("#dropzone").css('visibility', "");
                            $("#dropzone").css('opacity', '1');
                            $("#textnode").css('fontSize', "48px");
                            setTimeout(() => {
                                location.reload();
                            }, 1200);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {

                            $('#textnode').html('Errore nel caricamento');
                            $("#dropzone").css('background-color', "red");
                            $("#dropzone").css('visibility', "");
                            $("#dropzone").css('opacity', '1');
                            $("#textnode").css('fontSize', "48px");
                            setTimeout(() => {
                                location.reload();
                            }, 1200);
                        }
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {}
        });





        /*
        if (items[0] != lastFattura) {
            var y = checkFattura(items[0]);
            console.log(y);
            $.ajax({
                type: "POST",
                url: "checkFattura.php",
                data: {
                    'nFattura': items[0],
                },
                dataType: 'text',
                success: function (x) {
                    if (x == '1') {
                        console.log("stessa fattura");
                    } else {
                        console.log('nuova fattura');
                        addFattura(items);
                        addProdotti(items);
                        lastFattura = items[0];
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {}
            });
            */
        /*
            if (checkFattura(items[0])) {
                console.log('nuova fattura');
                addFattura(items);
                addProdotti(items);
                lastFattura = items[0];
            } else {
                console.log("stessa fattura");
            }*/
        /* } else {
            addProdotti(items);
            console.log(items);
        }*/
    });
}

function checkFattura(fatt) {
    $.ajax({
        type: "POST",
        url: "checkFattura.php",
        data: {
            'nFattura': fatt,
        },
        dataType: 'text',
        success: function (x) {
            if (x == '1') {
                return false; //fattura gia esistente
            } else {
                return true;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });
}

function addFattura(fatt) {
    console.log(fatt);
    var dataxF = fatt[10];
    var datapart = dataxF.split('-');
    var dataFinale = datapart[2] + '-' + datapart[1] + '-' + datapart[0];
    //TODO: data format
    $.ajax({
        type: "POST",
        url: "addFattura.php",
        data: {
            'nFattura': fatt[0],
            'dataFattura': dataFinale
        },
        dataType: 'text',
        success: function (x) {
            //console.log(x);
            //console.log('fattura creata');
            $('#textnode').html('CARICATO!');
            $("#dropzone").css('background-color', "green");
            $("#dropzone").css('visibility', "");
            $("#dropzone").css('opacity', '1');
            $("#textnode").css('fontSize', "48px");
        },
        error: function (jqXHR, textStatus, errorThrown) {

            $('#textnode').html('Errore nel caricamento');
            $("#dropzone").css('background-color', "red");
            $("#dropzone").css('visibility', "");
            $("#dropzone").css('opacity', '1');
            $("#textnode").css('fontSize', "48px");
        }
    });
}

function addProdotti(fatt) {
    $.ajax({
        type: "POST",
        url: "addProdotto.php",
        data: {
            'nFattura': fatt[0],
            'riferimento': fatt[1],
            'codice': fatt[2],
            'tipologia': fatt[3],
            'ferramenta': fatt[4],
            'lunghezza': fatt[5],
            'altezza': fatt[6],
            'legno': fatt[7],
            'finitura': fatt[8],
            'vetro': fatt[9]
        },
        dataType: 'text',
        success: function (x) {
            //console.log(x);
            //console.log('prodotto caricato');
        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });
}