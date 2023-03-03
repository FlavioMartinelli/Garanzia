<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ricevuta Registrazione</title>
</head>

<body>
    <?php
        $nome = $_GET["nome"];
        $cognome = $_GET["cognome"];
        $telefono = $_GET["telefono"];
        $email = $_GET["email"];
        $indirizzo = $_GET["indirizzo"];
        $citta = $_GET["citta"];
        $provincia = $_GET["provincia"];
        $nrFattura = $_GET["nFattura"];    
        $codeGar = $_GET["codeGar"];    
    ?>
    <div class='printContent' id='printContent'>
        
        <h1 style="color:red;">Registrazione garanzia - <?php
            echo date("d/m/Y");
        ?></h1>
        <h3>Codice garanzia: <?php
            echo $codeGar;
        ?></h3>
        <h2>Numero Fattura: 
        <?php
        echo $nrFattura;
        ?></h2>
        <h2>Dati registrati</h2>
        <h3>Nome: 
        <?php
        echo $nome;
        ?></h3>
        <h3>Cognome: 
        <?php
        echo $cognome;
        ?></h3>
        <h3>Telefono: 
        <?php
        echo $telefono;
        ?></h3>
        <h3>Email: 
        <?php
        echo $email;
        ?></h3>
        <h3>Indirizzo: 
        <?php
        echo $indirizzo;
        ?></h3>
        <h3>Città: 
        <?php
        echo $citta;
        ?></h3>
        <h3>Provincia: 
        <?php
        echo $provincia;
        ?></h3>
    </div>
    <div id="editor"></div>
    <button onclick='javascript:savepage();'>Salva la pagina</button>
    <button onclick='javascript:linktopage();'>Controlla lo stato della garanzia</button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"
        integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js" integrity="sha256-gJWdmuCRBovJMD9D/TVdo4TIK8u5Sti11764sZT1DhI=" crossorigin="anonymous"></script>
    <script>
        function savepage() {
            var doc = new jsPDF();
            var specialElementHandlers = {
                '#editor': function (element, renderer) {
                    return true;
                }
            };
            doc.fromHTML($('#printContent').html(), 15, 15, {
                'width': 170,
                'elementHandlers': specialElementHandlers
            });
            doc.save('ricevutaGaranzia.pdf');
    }
    function linktopage(){
        window.location = ("check.html");
    }
    </script>
</body>

</html>