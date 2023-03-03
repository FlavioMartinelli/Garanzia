$('#formregistrazione').on('submit', function (e) {
    e.preventDefault();
    var serialize = $(this).serialize();
    var codeGar = $('#nome').val().charAt(0) +
        $('#cognome').val().charAt(0) +
        $('#ncommessa').val() +
        Math.floor((Math.random() * 100000) + 1);
    var dta = $(this).serialize() + '&codeGar=' + codeGar;
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
                checkReg1(dta);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });
});


function checkReg1(dta) {
    $.ajax({
        type: "POST",
        cache: false,
        url: 'checkIfRegistrata.php',
        data: dta,
        success: function (x) {
            if (x == '0') {
                alert('Garanzia già registrata. Controlla lo stato della garanzia');
                return
            } else {
                registra(dta);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        }
    });
    //CHECK se registrato
}



function registra(dta) {
    $.ajax({
        type: "POST",
        cache: false,
        url: 'registra.php',
        data: dta,
        success: function (ia) {
            alert('Fattura registrato');
            registroClasse(dta);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        }
    });
}


function registroClasse(arg1) {
    //window.location.href("ricevuta.php?" + arg1);
    window.location = ("ricevuta.php?" + arg1);
    //newWindow = window.open("", "_blank");
    //window.open("ricevuta.php?" + arg1, null);
    //return newWindow.location = ("ricevuta.php?" + arg1);
}