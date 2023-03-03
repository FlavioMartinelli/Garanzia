var rows = [];
var dataScadenza = 0;
var checkdeRifs = [];
var gar1 = false;
var gar2 = false;
var gar3 = false;
var tuttiUguali = false;
var dettagli = [];
var currentRif = 0;
var note = '';
var currentBtn = 0;
var currentCommessa = 0;
var currentCliente = 0;

$(document).ready(function () {
    $(".procediBox").fadeOut();
});

$('#formFattura').on('submit', function (e) {
    e.preventDefault();
    var dta = $(this).serialize();
    log('getfattura: ' + dta);
    //CHECK se esiste
    $.ajax({
        type: "POST",
        url: "load/getFattura.php",
        data: dta,
        dataType: 'text',
        success: function (x) {
            if (x == '1') {
                alert('Fattura non trovata, controlla il che il numero inserito sia corretto');
            } else {
                checkReg(dta);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });


});

function checkReg(dta) {
    //CHECK se registrato
    log('checkreg: ' + dta);
    $.ajax({
        type: "POST",
        url: "checkIfRegistrata.php",
        data: dta,
        dataType: 'text',
        success: function (x) {
            if (x == '1') {
                currentCommessa = x;
                getinfo(dta);
                return
            } else {
                alert('Garanzia non attivata, registra la fattura o prova un altro numero commessa');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });

}

function getinfo(dta) {
    //GETINFO
    log('getinfo: ' + dta);
    $.ajax({
        type: "POST",
        url: 'getInfo.php',
        data: dta,
        dataType: 'text',
        success: function (x) {
            setupGenerali(x);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Fattura non trovata');
            console.log(errorThrown);
        }
    });

    //GETPRODOTTI
    $.ajax({
        type: "POST",
        cache: false,
        url: "getProdotto.php",
        data: dta,
        dataType: 'text',
        success: function (x) {
            setTable(x);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        }
    });
}


function setupGenerali(data) {
    gar1 = false;
    gar2 = false;
    gar3 = false;
    $('#infoGenerali').html('<h1>Info Generali</h1>');
    $('#infoGenerali').append('<h3>● Data acquisto: ' + addData(data, 0));

    $('#infoGenerali').append('<h3>● Garanzia Legno: 15 anni');
    if (scaduta(data, 15)) {
        $('#infoGenerali').append('<p class="scaduta">Fuori garanzia dal: ' + addData(data, 15));
        //$("#legno").prop('disabled', true);
    } else {
        gar1 = true;
        $('#infoGenerali').append('<p class="nonScaduta">Garanzia valida fino al: ' + addData(data, 15));
        //$("#legno").prop('disabled', false);
    }

    $('#infoGenerali').append('<h3>● Garanzia Vetro: 10 anni');
    if (scaduta(data, 10)) {
        $('#infoGenerali').append('<p class="scaduta">Fuori garanzia dal: ' + addData(data, 10));
        //$("#vetro").prop('disabled', true);
    } else {
        gar2 = true;
        $('#infoGenerali').append('<p class="nonScaduta">Garanzia valida fino al: ' + addData(data, 10));
        //$("#vetro").prop('disabled', false);
    }

    $('#infoGenerali').append('<h3>● Garanzia Ferramenta: 15 anni');
    if (scaduta(data, 15)) {
        $('#infoGenerali').append('<p class="scaduta">Fuori garanzia dal: ' + addData(data, 15));
        //$("#ferramenta").prop('disabled', true);
    } else {
        gar3 = true;
        $('#infoGenerali').append('<p class="nonScaduta">Garanzia valida fino al: ' + addData(data, 15));
        //$("#ferramenta").prop('disabled', false);
    }
}

function scaduta(data, a) {
    var parts = data.split("-");
    var year = parts[0] && parseInt(parts[0], 10);
    var month = parts[1] && parseInt(parts[1], 10);
    var day = parts[2] && parseInt(parts[2], 10);
    var today = new Date();
    var d = new Date((year + a), month, day, 0, 0, 0, 0);
    if (d.getFullYear() < today.getFullYear()) {
        return true
    } else {
        return false
    }
}

function addData(data, a) {
    //var from = data.split("-");
    //var f = new Date(from[0] + a, from[1] - 1, from[2]);
    //f.setFullYear(f.getFullYear() + a);
    var parts = data.split("-");
    var year = parts[0] && parseInt(parts[0], 10);
    var month = parts[1] && parseInt(parts[1], 10);
    var day = parts[2] && parseInt(parts[2], 10);
    var f = day + '/' + month + '/' + (year + a);
    return f;
}

function setTable(rows) {
    var text = '<h1>Seleziona i prodotti</h1><table cellspacing="0"><tr><th>Riferimento</th><th>Tipologia</th><th>Larghezza</th><th>Altezza</th><th></th></tr>' + rows + "</table>";
    $('#infoProdotti').html(text);
}

function checkAssistenza(i) {
    var n = 0;
    checkdeRifs = [];
    $('.checkProdottoGaranzia').each(function (index) {
        if ($(this).is(':checked')) {
            n += 1;
            checkReg += index;
        }
    });
    if (n == 0) {
        $("#ticket").prop('disabled', true);
        $("#procedi").prop('disabled', true);
    } else {
        $("#ticket").prop('disabled', true);
        $("#procedi").prop('disabled', false);
    }
    /*
        if (n == 1) {
            $("#ticket").prop('disabled', false);
            $("#procedi").prop('disabled', true);
        }*/
}

function setProcedi() {
    var n = 0;
    riferimenti = [];
    $('.checkProdottoGaranzia').each(function (index) {
        if ($(this).is(':checked')) {
            n += 1;
            riferimenti.push($(this).val());

        }
    });
    procedi(riferimenti);
}

function procedi(arr) {
    $('#infoGenerali').fadeOut();
    $('#infoProdotti').fadeOut();
    $('.procediBox').fadeIn();
    $("#procedi").fadeOut();
    $('#ticketBtn').fadeIn();
    arr.forEach(element => {
        $('#listaRif').append('<button id="btnRif' + element + '" class="setRifBtn" onclick="setRif(this, ' + element + ');" formnovalidate>Rif ' + element + '</button>');
        $('#currentRif').append('<option value="' + element + '">' + element + '</option>');
        dettagli.push([element, 0, 0, '', '']);
    });
    $('.setRifBtn').first().trigger('click');
}

function setRif(el, n) {
    currentBtn = el;
    console.log(currentBtn);

    $('.setRifBtn').each(function (index) {
        $(this).removeClass('active');
    });
    $(currentBtn).addClass('active');
    $('#currentRif').val(n);
    setRiferimentoDett();
}

function checkOK() {
    var x = $("#allProbl");
    if (($('#componente').val() != null) && ($('#priorita').val() != null)) {
        $(currentBtn).addClass('okCheck');
        if (x.is(':checked')) {
            $('.setRifBtn').addClass('okCheck');
        }
    } else {
        $(currentBtn).removeClass('okCheck');
    }

    var ch = true;
    $('.setRifBtn').each(function (index) {
        if (!$(this).hasClass('okCheck')) {
            ch = false;
        }
    });
    if (ch) {
        $('#ticketBtn').prop('disabled', false);
    } else {
        $('#ticketBtn').prop('disabled', true);
    }
}

function test() {
    var x = $("#allProbl");
    if (x.is(':checked')) {
        var x = $('.setRifBtn').length;
        var ind = 0;
        while (ind < x) {
            dettagli[ind][1] = $("#componente").val();
            dettagli[ind][2] = $("#priorita").val();
            dettagli[ind][3] = $("#oggetto").val();
            dettagli[ind][4] = $("#messaggio").val();
            ind += 1;
        }

        $("#currentRif").val('0');
        $("#currentRif").prop('disabled', true);
        tuttiUguali = true;
        enableAll();
        $("#componente").val(dettagli[0][1]);
        $("#priorita").val(dettagli[0][2]);
        $("#oggetto").val(dettagli[0][3]);
        $("#messaggio").val(dettagli[0][4]);
        $('.setRifBtn').prop('disabled', true);
        checkOK();
    } else {
        $("#currentRif").prop('disabled', false);
        $('.setRifBtn').prop('disabled', false);
        tuttiUguali = false;
        disableAll();
    }

}

function setRiferimentoDett() {
    var x = $("#currentRif").val();
    if (x == 0) {
        disableAll();
    } else {
        enableAll();
        currentRif = x;
        $("#componente").val(dettagli[getIndex()][1]);
        $("#priorita").val(dettagli[getIndex()][2]);
        $("#oggetto").val(dettagli[getIndex()][3]);
        $("#messaggio").val(dettagli[getIndex()][4]);
        checkOK();
    }
}

function enableAll() {
    $("#componente").prop('disabled', false);
    $("#priorita").prop('disabled', false);
    $("#oggetto").prop('disabled', false);
    $("#messaggio").prop('disabled', false);
}

function disableAll() {
    $("#componente").prop('disabled', true);
    $("#priorita").prop('disabled', true);
    $("#oggetto").prop('disabled', true);
    $("#messaggio").prop('disabled', true);
}

function getIndex() {
    var x = 0;
    jQuery.each(dettagli, function (i, val) {
        if (val[0] == currentRif) {
            x = i;
        }
    });
    return x;
}

function setComponente(x) {
    var x = $("#componente").val();
    if (tuttiUguali) {
        dettagli.forEach(element => {
            element[1] = x;
        });
    } else {
        dettagli[getIndex()][1] = x;
    }
    checkOK();
}

function setPrior(x) {
    var x = $("#priorita").val();
    if (tuttiUguali) {
        dettagli.forEach(element => {
            element[2] = x;
        });
    } else {
        dettagli[getIndex()][2] = x;
    }
    checkOK();
}

function setOgg(x) {
    var x = $("#oggetto").val();
    if (tuttiUguali) {
        dettagli.forEach(element => {
            element[3] = x;
        });
    } else {
        dettagli[getIndex()][3] = x;
    }
}

function setMess(x) {
    var x = $("#messaggio").val();
    if (tuttiUguali) {
        dettagli.forEach(element => {
            element[4] = x;
        });
    } else {
        dettagli[getIndex()][4] = x;
    }
}

function inviaGaranzia() {
    var c = true;
    $('.setRifBtn').each(function (index) {
        if (!$(this).hasClass('okCheck')) {
            c = false;
        }
    });
    if (c) {
        $.LoadingOverlay("show", {
            background: "rgba(255, 255, 255, 0.25)",
            imageColor: "#E42313"
        });
        var x = $('.setRifBtn').length;
        var ind = 0;
        var dscr = 'N Commessa: ' + currentCommessa;
        var maxPrior = 0;
        var maxOgg = dettagli[0][3];
        var maxComp = dettagli[0][1];
        var dep = 2;
        var y = $("#allProbl");
        if (y.is(':checked')) {
            dscr += '\nTutti i prodotti selezionati presentano lo stesso problema.\n\n•Riferimenti: ';
            while (ind < x) {
                dscr += ' -' + dettagli[ind][0] + '-';
                ind += 1;
            }
            dscr += '\nComponente: ' + dettagli[0][1] + '\nPriorità: ' + dettagli[0][2] + '\nOggetto: ' + dettagli[0][3] + '\nDescrizione: ' + dettagli[0][4];
        } else {
            while (ind < x) {
                if (maxPrior < dettagli[ind][2]) {
                    maxPrior = dettagli[ind][2];
                }
                dscr += '\n\n•Rif: ' + dettagli[ind][0] + '\nComponente: ' + dettagli[ind][1] + '\nPriorità: ' + dettagli[ind][2] + '\nOggetto: ' + dettagli[ind][3] + '\nDescrizione: ' + dettagli[ind][4];
                //apriTicket1(dettagli[ind][0], dettagli[ind][1], dettagli[ind][2], dettagli[ind][3], dettagli[ind][4]);
                ind += 1;
            }
        }
        if (!gar1) {
            var q = 0;
            while (q < x) {
                if (dettagli[q][1] == 1) {
                    dep = 3;
                }
            }
            q += 1;
        }

        if (!gar2) {
            var q = 0;
            while (q < x) {
                if (dettagli[q][1] == 2) {
                    dep = 3;
                }
                q += 1;
            }
        }
        if (!gar3) {
            var q = 0;
            while (q < x) {
                if (dettagli[q][1] == 3) {
                    dep = 3;
                }
                q += 1;
            }
        }
        $.ajax({
            type: "POST",
            url: "getDatiCliente.php",
            data: {
                nFattura: currentCommessa
            },
            dataType: 'text',
            success: function (x) {
                //succes
                dscr += x;
                apriTicket1(dep, maxComp, maxPrior, maxOgg, dscr);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Errore nell'apertura del ticket. Riprova più tardi o contattaci" + errorThrown);
                //location.reload();
            }
        });
    } else {
        alert('Compila i dettagli per tutti i prodotti selezionati');
    }
}

function apriTicket1(dep, comp, prior, ogg, descr) {
    prior += 2;
    $.ajax({
        type: "POST",
        url: "creaTicket.php",
        data: {
            dep: dep,
            oggetto: ogg,
            descrizione: descr,
            componente: comp,
            prioritaPost: prior
        },
        dataType: 'text',
        success: function (x) {
            //succes
            console.log(x);
            setTimeout(function () {
                $.LoadingOverlay("hide");
                if (x == 1) {
                    alert('Ticket aperto! Vi contatteremo presto.\nGrazie di aver usato il servizio di garanzia SIDEL');
                } else {
                    alert('Errore. Riprova più tardi o contattaci');
                }
            }, 3000);
            //location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            setTimeout(function () {
                $.LoadingOverlay("hide");
                alert("Errore nell'apertura del ticket. Riprova più tardi o contattaci" + errorThrown);
            }, 3000);
            //location.reload();
        }
    });

    /*
        var x = '';
        var w = '';
        jQuery.each(dettagli, function (i, val) {
            x += 'Riferimento: ' + val[0] + '; Componente: ' + val[1] + '; Priorità: ';
            if (val[2] == 1) {
                x += ' bassa';
            }
            if (val[2] == 2) {
                x += ' media';
            }
            if (val[2] == 3) {
                x += ' alta';
            }
            x += '; Riferimento: ' + val[4] + '\n';
            w = val[3];
        });
        var z = $("#priorita").val() + 2;
        var y = $("#componente").val();

        //localStorage.setItem("priorita", z);
        //localStorage.setItem("componente", y);
        //localStorage.setItem("note", x);
        //localStorage.setItem("oggetto", w);
        //var newWindow = window.open('https://www.sidel-eservice.com/invia-ticket/');
        //newWindow.document.createElement('script');
        //script.src = 'ticket.js';
        //newWindow.document.head.appendChild(script);

        var variab = '' + z + '' + y + '' + w + '' + x;

        let frame = document.getElementById('frameTicket');
        frame.contentWindow.postMessage(variab, 'https://www.sidel-eservice.com/invia-ticket/');
        */
}